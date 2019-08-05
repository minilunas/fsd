import { Component,  ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Videoservice } from '../video-player/videoservice';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit {
  @ViewChild('progressBar', { static: true }) progressBarRef: ElementRef;

  ppclass: String;
  ppclick:String;
  pptitle: String;
  muteclass: any;
  mutetitle: any;
  likeText: any;
  unlikeText: any;

  constructor(public videoservice: Videoservice,
              private renderer: Renderer2) {

  }

  ngOnInit() {
    this.ppclass = this.videoservice.playClass;
    this.pptitle = this.videoservice.defaulepptitle;
    this.muteclass = this.videoservice.unmuteClass;
    this.mutetitle = this.videoservice.defaultMutetitle
  }


  playAndPause() {
    this.videoservice.playAndPause();
  }

  reload() {
    this.videoservice.reload();
  }

  isMute() {
    this.videoservice.isMute();
  }

  increase() {
    this.videoservice.increase()
  }

  decrease() {
    this.videoservice.decrease()
  }

  like() {
    this.videoservice.like()
  }

  unlike() {
    this.videoservice.unlike()
  }

  changeProgress(per) {
    this.renderer.setStyle(this.progressBarRef.nativeElement, 'width', per+"%");
  }
}
