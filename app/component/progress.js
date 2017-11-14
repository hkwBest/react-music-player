/**
 * Created by admin on 2017/9/20.
 */
import React from 'react';
import './progress.less';

class Progress extends React.Component{
    constructor(props){
        super(props);
        this.changeProgress = this.changeProgress.bind(this);
    }
    changeProgress(e){
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.changeProgress && this.props.changeProgress(progress);
    }
    render(){
        return (
            <div className="component-progress" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress" style={{width : `${this.props.progress}%`,backgroundColor : this.props.barColor}}></div>
            </div>
        )
    }
}
Progress.defaultProps = {
    barColor : "#2f9842"
};

export default Progress ;