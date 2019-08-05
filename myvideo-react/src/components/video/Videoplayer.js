import * as React from "react";
import Player from "./Player";
import Playlist from "./Playlist";
import Controls from "./Controls";
import '../../asset/css/style.css';

import '../../asset/css/font-awesome.min.css'
class Videoplayer extends React.Component {
    constructor(props){
        super(props)
        this.state={
            videoTitle:"",

        }
    }

    play=(e)=>{
      return  this.refs.video.playVideo();

    }

    pause=(e)=>{
        this.refs.video.pauseVideo();

    }
    reload=(e)=>{
        this.refs.video.reload();

    }

    mute=(e)=>{
        this.refs.video.mute();

    }

    unmute=(e)=>{
        this.refs.video.unmute();

    }

    setVolume=(e)=>{
        this.refs.video.setVolume(this.refs.controls.state.volume);

    }


    clickVideo=(e)=>{

        this.refs.controls.playAndPause();

    }

    changeVideo=(id,url)=>{

        //更换视频地址
        this.refs.video.changeVideo(id,url);
        this.refs.controls.changeVideo(id)
        this.setState({
            playId:id
        })
    }

    updateProgressbar=(currentTime,duration,b)=>{
        this.refs.controls.updateProgressbar(currentTime,duration,b);
    }

    initControls=(id)=>{

        this.refs.controls.initControls(id)
    }
    render() {
        return(
            <div className="container-fluid videoplayer" >

                <div className="row">
                    <div className="col-md-8 bg-dark">
                        <div className="row" style={{"height":"55px"}}>
                            <div >{this.state.videoTitle}</div>
                        </div>
                        <div className="row">
                           <Player ref='video' clickVideo={this.clickVideo}
                                   updateProgressbar={this.updateProgressbar} initControls={this.initControls}/>
                        </div>
                        <div className="row " style={{"height":"55px"}}>
                            <Controls  ref='controls' play={this.play} pause={this.pause} reload={this.reload} mute={this.mute} unmute={this.unmute}
                                      setVolume={this.setVolume} />
                        </div>
                    </div>
                    <div className="col-md-4 " >
                        <div style={{"marginRight":"30px","height":"100%"}} className="jumbotron   ">
                            <Playlist ref='playlist' changeVideo={this.changeVideo} />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default Videoplayer;