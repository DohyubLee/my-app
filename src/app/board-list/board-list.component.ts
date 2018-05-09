import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostsList } from '../posts-list';
import * as moment from 'moment';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  url = 'https://ldhboard.ga/board-list';
  posts: Array<PostsList> = [];
  constructor(
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    if (!sessionStorage.getItem('id')) {
      this.router.navigate(['sign-in']);
    } else {
      this.getList();
    }
  }
  getList() {
    this.http.get(this.url).map((res: Array<object>) => {
      res.forEach((obj:PostsList) => {
        obj.saveDate = moment(obj.saveDate).format("YYYY-MM-DD HH:mm:ss");
      })
      return res;
    }).subscribe(
      res => {
        res.forEach((obj:PostsList) => {
          this.posts.push(obj)
        })
      },
      error => {
        alert(error.error.msg);
      }
    )
  }
}
