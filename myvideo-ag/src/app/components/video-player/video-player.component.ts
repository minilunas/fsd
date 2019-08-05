import {Component, OnInit, ViewChild} from '@angular/core';
import {ControlsComponent} from "../controls/controls.component";
import {PlayerComponent} from "../player/player.component";
import {Videoservice} from "./videoservice";

const VOTE_UP = 'up';
const VOTE_DOWN = 'down';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})

export class VideoPlayerComponent implements OnInit {

  @ViewChild(PlayerComponent, { static: true })
  playerComponent: PlayerComponent;
  @ViewChild(ControlsComponent, { static: true })
  controlsComponent: ControlsComponent;

  constructor(public videoservice: Videoservice) {

  }

  ngOnInit()
  {
    this.videoservice.initService(this.controlsComponent,this.playerComponent);
  }


}
