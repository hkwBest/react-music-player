/**
 * Created by admin on 2017/9/28.
 */
import React from 'react';
import './musicListItem.less';
import Pubsub from 'pubsub-js';


class MusicListItem extends React.Component {
    constructor(props){
        super(props);
        let musicItem = this.props.musicListItem;
        this.playMusic = this.playMusic.bind(this,musicItem);
        this.deleteMusic = this.deleteMusic.bind(this,musicItem)
    }
    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC',musicItem);
    }
    deleteMusic(musicItem,e){
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC',musicItem);
    }
    render() {
        let musicItem = this.props.musicListItem;
        return (
            <li onClick={this.playMusic} className={`components-listitem row ${this.props.focus ? 'focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p onClick={this.deleteMusic} className="-col-auto delete"></p>
            </li>
        )
    }
}

export default MusicListItem