import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Videoservice} from "../video-player/videoservice";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private http: HttpClient,public videoservice: Videoservice,) { }
   playlistUrl = 'http://localhost:53000/playlist'

  playlist: any ;

  ngOnInit() {
    this.getPlaylist(this.playlistUrl+"?status=1").subscribe(data =>{
      /* get请求成功时的回调处理 */
      // console.info(data);
      this.playlist =data;
      this.videoservice.playlist = this.playlist;
      this.videoservice.changeVideo(data[0].url,data[0].id);
    },xhr =>{
      /* get失败时返回 XMLHttpRequest 对象实例信息 */
      console.log(xhr.error.text); /* 输出错误文本信息 */
    });

  }

  getPlaylist(url) {
    return this.http.get(url);
  }

  playVideo(id) {
    this.getPlaylist(this.playlistUrl+"?id="+id).subscribe(data =>{
      /* get请求成功时的回调处理 */
      // console.log(data);

      this.videoservice.changeVideo(data[0].url,data[0].id);
    },xhr =>{
      /* get失败时返回 XMLHttpRequest 对象实例信息 */
      console.log(xhr.error.text); /* 输出错误文本信息 */
    });
  }
}
