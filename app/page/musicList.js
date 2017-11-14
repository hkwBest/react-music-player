/**
 * Created by admin on 2017/9/28.
 */
import React from 'react';
import MusicListItem from '../component/musicListItem'

class MusicList extends React.Component {
    render() {
        let musicList = null;
        musicList = this.props.musicList.map((item) => {
            return <MusicListItem key={item.id} focus={this.props.currentMusicItem == item} musicListItem={item}/>
        });
        return (
            <ul>
                {musicList}
            </ul>
        )
    }
}
export default MusicList