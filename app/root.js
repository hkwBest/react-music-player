/**
 * Created by admin on 2017/9/20.
 */
import React from 'react';
import Header from './component/header';
import Player from './page/player';
import MusicList from './page/musicList';
import { MUSIC_LIST } from './config/musiclist';
import {Router,IndexRoute,Link,Route,hashHistory} from 'react-router'
import Pubsub from 'pubsub-js';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentMusicItem : MUSIC_LIST[0],musicList : MUSIC_LIST};
    }
    playMusic(musicItem){
        $("#player").jPlayer('setMedia',{
            mp3 : musicItem.file
        }).jPlayer("play");

        //保持数据同步
        this.setState({currentMusicItem : musicItem})
    }
    playNext(type = 'next'){
        let currentMusic = this.findMusicIndex(this.state.currentMusicItem);
        let nextMusic = null;
        let musicLength = this.state.musicList.length;
        if(type == 'next'){
            nextMusic = (currentMusic + 1) % musicLength;
        }else if(type == 'last') {
            nextMusic = (currentMusic - 1 + musicLength) % musicLength;
        }
        this.playMusic(this.state.musicList[nextMusic]);
    }
    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem);
    }
    componentDidMount() {
        $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });
        $("#player").bind($.jPlayer.event.ended,(e) => {
            this.playNext();
        });

        this.playMusic(this.state.currentMusicItem);

        Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem) => {
            this.playMusic(musicItem);
        });
        Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem) => {
            this.setState({
                musicList : this.state.musicList.filter( (item) => {
                    return item != musicItem;
                })
            })
        });
        Pubsub.subscribe("PLAY_PREV",(msg) => {
            this.playNext('last')
        });
        Pubsub.subscribe("PLAY_NEXT",(msg) => {
            this.playNext('next')
        })
    }
    componentWillUnmount(){
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        $("#player").unbind($.jPlayer.event.ended);
    }

    render(){
        return(
            <div>
                <Header/>
                { React.cloneElement(this.props.children,this.state) }
            </div>
        )
    }
}

class Root extends React.Component{
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={MusicList}></Route>
                </Route>
            </Router>
        )
    }
}

export default Root;