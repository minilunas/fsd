import { Component, ViewChild, ElementRef, Output, EventEmitter,OnInit } from '@angular/core';
import { Videoservice } from '../video-player/videoservice';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild('video', { static: true }) videoRef: ElementRef;
  videoSrc: any="";

  constructor(public videoservice: Videoservice) { }

  ngOnInit() {
    this.videoservice.setVideo(this.videoRef.nativeElement);
  }

  handleTimeupdate($event: Event) {
    this.videoservice.progressbar(true)
  }

  handleVideoEnded() {
    this.videoservice.progressbar(false)
  }

  playAndpause() {
    this.videoservice.playAndPause();
  }
}
