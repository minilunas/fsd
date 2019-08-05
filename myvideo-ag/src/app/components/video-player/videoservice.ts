import {Injectable} from "@angular/core"
import {ControlsComponent} from "../controls/controls.component";
import {debug} from "util";

@Injectable()
export class Videoservice {
  myVideo;//视频对象

  videostatus = "default";
  playClass = "fa-play";
  pauseClass = "fa-pause";
  controlsComponent: ControlsComponent;//控制组件
  playerComponent;

  defaulepptitle: String = "play";

  voiceStatus = "default"
  muteClass: any = "fa-volume-off";
  unmuteClass: any = "fa-volume-down";
  defaultMutetitle = "mute"
  playlist: any;
  curId;

  playAndPause() {
    if (this.videostatus == "default" || this.videostatus == "play") {//播放
      this.controlsComponent.ppclass = this.pauseClass;
      this.getVideo().play();
      this.videostatus = "pause";
      this.controlsComponent.pptitle = "pause";
    } else {//暂停
      this.controlsComponent.ppclass = this.playClass;
      this.getVideo().pause();
      this.videostatus = "play";
      this.controlsComponent.pptitle = "play";
    }
  }

  setVideo(v) {
    this.myVideo = v;
  }

  getVideo() {
    return this.myVideo;
  }

  initService(controlsComponent, playerComponent) {
    this.controlsComponent = controlsComponent;
    this.playerComponent = playerComponent;
  }

  reload() {
    this.getVideo().currentTime = 0;
    this.videostatus = "play";
    this.playAndPause()
  }

  isMute() {
    if (this.voiceStatus == "default" || this.voiceStatus == "mute") {//静音
      this.controlsComponent.muteclass = this.muteClass;
      this.getVideo().muted = true;
      this.voiceStatus = "unmute";
      this.controlsComponent.mutetitle = "unmute";
    } else {//暂停
      this.controlsComponent.muteclass = this.unmuteClass;
      this.getVideo().muted = false;
      this.voiceStatus = "mute";
      this.controlsComponent.mutetitle = "mute";
    }
  }

  increase() {
    if (this.getVideo().volume < 1) {
      this.getVideo().volume = parseFloat(this.getVideo().volume.toPrecision(12)) + 0.1;
    }
    if (this.getVideo().volume > 0) {
      this.voiceStatus = "unmute"
      this.isMute()
    }
  }

  unlike() {
    if (typeof (Storage) !== "undefined") {
      let item = localStorage.getItem(this.curId + "_unlike")
      let cnt = Number(item) + 1;
      localStorage.setItem(this.curId + "_unlike", String(cnt));
      this.controlsComponent.unlikeText = cnt;
    }
  }

  like() {
    if (typeof (Storage) !== "undefined") {
      let item = localStorage.getItem(this.curId + "_like")
      let cnt = Number(item) + 1;
      localStorage.setItem(this.curId + "_like", String(cnt));
      this.controlsComponent.likeText = cnt;
    }
  }

  decrease() {
    if (this.getVideo().volume > 0) {
      this.getVideo().volume = parseFloat(this.getVideo().volume.toPrecision(12)) - 0.1;
    }
    if (this.getVideo().volume == 0) {
      this.voiceStatus = "mute"
      this.isMute()
    }
  }

  progressbar(b: boolean) {
    if (b) {//变动
      let per = this.getVideo().currentTime * 100 / this.getVideo().duration;
      this.controlsComponent.changeProgress(per);
    } else {//播放完成
      this.controlsComponent.changeProgress("100");
    }
  }


  changeVideo(url: any, id: any) {
    this.getVideo().src = url;
    this.curId = id;
    // 判断浏览器是否支持
    if (typeof (Storage) !== "undefined") {
      let like = "0"
      let unlike = "0";
      // 存储
      if (typeof localStorage.getItem(id + "_like") == 'undefined' || localStorage.getItem(id + "_like") == null) {
        localStorage.setItem(id + "_like", "0");
      } else {
        like = localStorage.getItem(id + "_like");
      }
      if (typeof localStorage.getItem(id + "_unlike") == 'undefined' || localStorage.getItem(id + "_unlike") == null) {
        localStorage.setItem(id + "_unlike", "0");
      } else {
        unlike = localStorage.getItem(id + "_unlike");
      }
      this.controlsComponent.likeText = like;
      this.controlsComponent.unlikeText = unlike;
      this.getVideo().currentTime = 0;
      this.controlsComponent.changeProgress("0");
      this.videostatus = "pause";
      this.playAndPause();
    }
  }
}
