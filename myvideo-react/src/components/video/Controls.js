import * as React from "react";
import storage from "../../model/storage.js";
const pauseClass="fa fa-pause";
const playClass="fa fa-play";
const muteClass="fa fa-volume-off";
const unmuteClass="fa fa-volume-down";
const upmuteClass="fa fa-volume-up";
class Controls extends React.Component {

    constructor(props){
        super(props)
        this.state={
            progressPer:"0%",
            status:"default",
            playAndPauseClass:playClass,
            playAndPauseTitle:"play",
            reloadClass:"fa fa-stop",
            muteAndUnmuteClass:unmuteClass,
            muteAndUnmuteTitle:"mute",
            unlikeText:"0",
            likeText:"0",
            muteStatus:"default",
            volume:0.5,
            id:""
        }

    }



    playAndPause=(e)=>{

        if (this.state.status == "default" || this.state.status == "play") {//播放

            let volume =this.props.play()
            this.setState({
                playAndPauseClass : pauseClass,
                status:"pause",
                playAndPauseTitle:"pause",
                volume:volume
            })

        } else {//暂停
            this.props.pause();
            this.setState({
                playAndPauseClass : playClass,
                status:"play",
                playAndPauseTitle:"play"
            })

        }
    }
    reload=(e)=>{
        this.setState({
            playAndPauseClass : pauseClass,
            status:"pause",
            playAndPauseTitle:"pause",
        })
        this.props.reload();
    }

    isMute=(e)=>{
        if (this.state.muteStatus == "default" || this.state.muteStatus == "unmute") {//静音

            this.props.mute();
            this.setState({
                muteStatus:"mute",
                muteAndUnmuteTitle:"mute",
                muteAndUnmuteClass:muteClass
            })

        } else {//暂停

            this.props.unmute()
            this.setState({
                muteStatus:"unmute",
                muteAndUnmuteTitle:"unmute",
                muteAndUnmuteClass:unmuteClass
            })
        }
    }

    increase=(e)=>{
        let volume = this.state.volume;
        let muteStatus = this.state.muteStatus;
        let muteAndUnmuteClass = this.state.muteAndUnmuteClass;
        if( typeof volume=='undefined'){
            volume=0.5
        }
        if(volume==0){//取消静音
             muteStatus="unmute"
        }
        volume = parseFloat(volume.toPrecision(12))+0.1
        if (volume > 1) {
            volume = 1
            muteAndUnmuteClass= upmuteClass
        }
        if (volume<1) {
            muteAndUnmuteClass= unmuteClass
        }

        this.setState({
                volume:volume,
                muteStatus:muteStatus,
                muteAndUnmuteClass:muteAndUnmuteClass
            }
        )
        this.props.unmute()
        this.props.setVolume();
    }

    decrease=(e)=>{
        let volume = this.state.volume;
        let muteStatus = this.state.muteStatus;
        let muteAndUnmuteClass = this.state.muteAndUnmuteClass;
        if( typeof volume=='undefined'){
            volume=0.5
        }
        volume = parseFloat(volume.toPrecision(12))-0.1
        if (volume<=0) {
            volume = 0
            muteStatus="mute"
            muteAndUnmuteClass = muteClass
            this.props.mute()
        }


        this.setState({
                volume:volume,
            muteStatus:muteStatus,
            muteAndUnmuteClass:muteAndUnmuteClass
            }
        )
        this.props.setVolume();
    }

    unlike=(e)=>{
        debugger
        let cnt = typeof this.state.unlikeText=='undefined'?0:Number(this.state.unlikeText) + 1;
        storage.set(this.state.id+"_unlike",cnt);

        this.setState({
            unlikeText:cnt
        })
    }

    like=(e)=>{
        debugger
        let cnt = typeof this.state.likeText=='undefined'?0:Number(this.state.likeText) + 1;
        storage.set(this.state.id+"_like",cnt);
        this.setState({
            likeText:cnt
        })
    }
    changeVideo(id){
        this.setState({playId:id})
        this.initControls(id)
    }

    initControls(id){
        let progressPer="0%"
        let unlikeText="0"
        let likeText="0"
        if(typeof storage.get(id+"_per")!='undefined'){
            progressPer = storage.get(id+"_per")
        }
        if(typeof storage.get(id+"_like")!='undefined'){
            likeText = storage.get(id+"_like")
            if(likeText==null){
                likeText="0"
            }
        }
        if(typeof storage.get(id+"_unlike")!='undefined'){
            unlikeText = storage.get(id+"_unlike")
            if(unlikeText==null){
                unlikeText="0"
            }
        }
        this.setState({
            progressPer:progressPer,
            status:"default",
            playAndPauseClass:playClass,
            playAndPauseTitle:"play",
            reloadClass:"fa fa-stop",
            unlikeText:unlikeText,
            likeText:likeText,
            id:id
         }
        )
        console.log("initControls")
    }

    updateProgressbar(currentTime,duration,b){

        if (b) {//变动
            let per = currentTime * 100 /duration;
            this.setState({
                progressPer:per+"%"
            })
            storage.set(this.state.id+"_time",currentTime)
            storage.set(this.state.id+"_per",per+"%")
        } else {//播放完成
            this.setState({
                progressPer:"100%"
            })
            storage.set(this.state.id+"_time",currentTime)
            storage.set(this.state.id+"_per","100%")
        }
    }
    render() {
        return(
            <div style={{"height":"100%","width":"100%"}}>
            <div className="progress progress-video" >
                <div className="progress-bar bg-success"  style={{"width":this.state.progressPer}}>
                </div>
            </div>
                <div className="col-md-12" style={{"height":"100%"}}>
                    <i className={this.state.playAndPauseClass} title={this.state.playAndPauseTitle} onClick={this.playAndPause}></i>
                    <i className={this.state.reloadClass}   title="reload" onClick={this.reload}></i>
                    <i className={this.state.muteAndUnmuteClass} title={this.state.muteAndUnmuteTitle} onClick={this.isMute}></i>
                    <i className="fa fa-plus" title="increase" onClick={this.increase}></i>
                    <i className="fa fa-minus" title="decrease" onClick={this.decrease}></i>
                    <span className="float-right" style={{"color": "white"}}>{this.state.unlikeText}</span>
                    <i className="fa fa-thumbs-down text-danger float-right"   onClick={this.unlike}></i>
                    <span className=" float-right" style={{"color":" white","paddingRight":"30px"}}>{this.state.likeText}</span>
                    <i className="fa fa-thumbs-up text-success float-right"onClick={this.like}></i>
                </div>

            </div>
        );
    }
}
export default Controls;