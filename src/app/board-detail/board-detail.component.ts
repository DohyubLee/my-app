import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostDetail } from '../post-detail';
import * as moment from 'moment';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  url1 = 'http://localhost:3000/board-detail';
  url2 = 'http://localhost:3000/post-delete';
  url3 = 'http://localhost:3000/comment-insert';
  url4 = 'http://localhost:3000/comment-delete';
  post: any;
  userCheck: boolean;
  comment: string;
  getComment: any = [];
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    var curruntUser = parseInt(sessionStorage.getItem('num'));
    const id = this.route.snapshot.paramMap.get('id')
    if (!sessionStorage.getItem('id')) {
      this.router.navigate(['sign-in']);
    } else {
      this.http.post(this.url1, {id}).map((res: any) => {
        res.result.saveDate = moment(res.result.saveDate).format("YYYY-MM-DD HH:mm:ss");
        return res;
      }).subscribe(
        res => {
          this.post = res.result;
          this.getComment = res.results;
          if (curruntUser === res.result.user_id) {
            this.userCheck = true;
          } else {
            this.userCheck = false;
          }
        },
        error => {
          alert(error.error.msg);
        }
      )
    }
  }
  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.post(this.url2, {id}).subscribe(
      res => {
        alert("post delete success");
        this.router.navigate(['board-list']);
      },
      error => {
        alert(error.error.msg);
      }
    )
  }
  onSubmit() {
    if (!this.comment) {
      alert("Please enter comment!");
      return;
    }
    var body = {
      postId: this.route.snapshot.paramMap.get('id'),
      curruntUser: parseInt(sessionStorage.getItem('num')),
      comment: this.comment
    }
    this.http.post(this.url3, body).map((res: any) => {
      return res;
    }).subscribe(
      res => {
        alert("comment insert success");
        this.comment = "";
        this.getComment = res.results;
      },
      error => {
        alert(error.error.msg);
      }
    )
  }
  commentDelete(comment: any) {
    console.log(comment)
    var curruntUser = parseInt(sessionStorage.getItem('num'));
    var commentUser = comment.user_id;
    var postId = this.route.snapshot.paramMap.get('id');
    var body = {
      id: comment.id,
      postId: postId
    }
    console.log(curruntUser)
    console.log(commentUser)
    if (curruntUser !== commentUser) {
      alert("You do not have delete rights.");
      return;
    }
    this.http.post(this.url4, body).map((res: any) => {
      return res;
    }).subscribe(
      res => {
        alert("comment delete success");
        this.getComment = res.results;
      },
      error => {
        alert(error.error.msg);
      }
    )
  }
}
