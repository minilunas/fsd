import * as React from "react";
import storage from "../../model/storage.js";

class Player extends React.Component {
    constructor(props){
        super(props)
        this.state={
            src:"",
            id:""
        }

    }
    click=(e)=> {
        // You can use the play method as normal on your video ref
        this.props.clickVideo();
    }

    playVideo() {
        // Pause as well
        this.refs.vidRef.play();
        return this.refs.vidRef.volume
    }

    pauseVideo() {
        // Pause as well
        this.refs.vidRef.pause();
    }

    reload() {
        this.refs.vidRef.currentTime = 0;
        this.playVideo();

    }

    unmute(){
        this.refs.vidRef.muted =false;
    }

    mute(){
        this.refs.vidRef.muted =true;
    }

    setVolume(volume){
        this.refs.vidRef.volume = volume;

    }

    changeVideo(id,url){
        console.log("changeVideo")
        this.setState({
            src:url,
            id:id
        })

        this.initPlayer(id)

    }

    componentDidMount(){
        fetch("http://localhost:53000/playlist?status=1", {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({src: data[0].url,id:data[0].id})
                this.initPlayer(data[0].id)
                this.handleCanplay()
            })
            .catch(e => {
                console.log("error")
            })
        this.setVolume(0.5);

    }

    handleTimeupdate=(e)=>{
        this.props.updateProgressbar(this.refs.vidRef.currentTime,this.refs.vidRef.duration,true);
    }

    handleEnded=(e)=>{
        this.props.updateProgressbar(this.refs.vidRef.currentTime,this.refs.vidRef.duration,false);
    }

    handleCanplay=(e)=>{

        let time = storage.get(this.state.id+"_time");
        this.refs.vidRef.currentTime= typeof time=='undefined'?0:Number(time);
    }

    // You can pass your function references to your child components as props (here passing down to the Buttons component)
    render() {
        return(
                <video className="video" ref="vidRef" src={this.state.src} type="video/mp4" onClick={this.click} onAbort={this.handleCanplay}
                       onTimeUpdate={this.handleTimeupdate} onEnded={this.handleEnded}></video>
        );
    }

    initPlayer(id) {

        this.props.initControls(id)
    }
}


export default Player;