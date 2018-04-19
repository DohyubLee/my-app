import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginStatusService } from '../login-status.service';

@Component({
  selector: 'app-board-insert',
  templateUrl: './board-insert.component.html',
  styleUrls: ['./board-insert.component.css']
})
export class BoardInsertComponent implements OnInit {
  posts: any = {};
  url = 'http://localhost:3000/board-insert';
  constructor(
    private loginStatus: LoginStatusService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('id')) {
      this.router.navigate(['sign-in']);
    }
  }
  onSubmit() {
    var body = {
      title: this.posts.title,
      description: this.posts.description,
      userNum: sessionStorage.getItem('num')
    }
    if (!body.title) {
      alert("Please enter title");
      return;
    }
    if (!body.description) {
      alert("Please enter description");
      return;
    }
    this.http.post(this.url, body).map((res: any) => {
      return res;
    }).subscribe(
      res => {
        alert(res.msg);
        this.router.navigate(['board-list']);
      },
      error => {
        alert(error.error.msg);  
      }
    )
  }

}
