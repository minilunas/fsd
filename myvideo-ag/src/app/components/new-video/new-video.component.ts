import { Component, OnInit } from '@angular/core';
import { VideoInfo }    from './videoInfo';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import uuidv4 from "uuid/v4";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-new-video',
  templateUrl: './new-video.component.html',
  styleUrls: ['./new-video.component.css']
})


export class NewVideoComponent implements OnInit {

  constructor(private http: HttpClient,) { }

  playlistUrl = 'http://localhost:53000/playlist'

  playlist: any ;



  ngOnInit() {
    this.getPlaylist(this.playlistUrl);

  }

  getPlaylist(url) {

    this.http.get(url).subscribe(data =>{
      /* get请求成功时的回调处理 */
      // console.info(data);
      this.playlist =data;

    },xhr =>{
      /* get失败时返回 XMLHttpRequest 对象实例信息 */
      console.log(xhr.error.text); /* 输出错误文本信息 */
    });
  }
  model = new VideoInfo("","","","","") ;

  submitted = false;

  onSubmit() {
    this.model.status='0';
    if(this.model.id==''&&this.model.status==''){

      this.model.id= uuidv4();
      this.http.post(this.playlistUrl, this.model, httpOptions)
        .subscribe(
          data => {
            console.log("POST Request is successful ", data);
            this.newVideo()
            this.getPlaylist(this.playlistUrl);
          },
          error => {
            console.log("Error", error);
          }
        );
      ;
    }else{

        this.http.put(this.playlistUrl+"/"+this.model.id,
          this.model)
          .subscribe(
            data => {
              console.log("PUT Request is successful ", data);
              this.getPlaylist(this.playlistUrl);
            },
            error => {
              console.log("Rrror", error);
            }
          );


    }

  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  edit(id:string) {

    this.http.get(this.playlistUrl+"?id="+id).subscribe(data =>{
      /* get请求成功时的回调处理 */
      // console.log(data);
      this.model=data[0]
      this.model.status='0'
      for(let i=0;i<this.playlist.length;i++){
        let item = this.playlist[i];
        if(item.id==id){
          item.status='0';
        }
      }
    },xhr =>{
      /* get失败时返回 XMLHttpRequest 对象实例信息 */
      console.log(xhr.error.text); /* 输出错误文本信息 */
    });
  }

  delete(id: any) {
    this.http.delete(this.playlistUrl+"/"+id)
      .subscribe(
        data => {
          console.log("DELETE Request is successful ", data);
          this.getPlaylist(this.playlistUrl);
        },
        error => {
          console.log("Error", error);
        }
      );

  }

  approve(id: any) {
    this.http.get(this.playlistUrl+"?id="+id).subscribe(data =>{
      /* get请求成功时的回调处理 */
      // console.log(data);
      data[0].status='1'
      this.http.put(this.playlistUrl+"/"+id,
        data[0])
        .subscribe(
          data => {
            console.log("PUT Request is successful ", data);
            this.getPlaylist(this.playlistUrl);
          },
          error => {
            console.log("Rrror", error);
          }
        );
    },xhr =>{
      /* get失败时返回 XMLHttpRequest 对象实例信息 */
      console.log(xhr.error.text); /* 输出错误文本信息 */
    });


  }

  newVideo() {
    this.model = new VideoInfo("","","","","") ;
  }
}
