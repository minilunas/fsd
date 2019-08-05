import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { ControlsComponent } from './components/controls/controls.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { Videoservice } from './components/video-player/videoservice';
import { NewVideoComponent } from './components/new-video/new-video.component';
import {RouterModule, Routes} from "@angular/router";
import { FormsModule }   from '@angular/forms';
//导入服务

const appRoutes: Routes = [
  { path: 'video-player', component: VideoPlayerComponent },
  { path: 'new-video', component: NewVideoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ControlsComponent,
    PlaylistComponent,

    VideoPlayerComponent,

    NewVideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    FormsModule
  ],
  providers: [Videoservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
