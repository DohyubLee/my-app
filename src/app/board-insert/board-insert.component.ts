import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board-insert',
  templateUrl: './board-insert.component.html',
  styleUrls: ['./board-insert.component.css']
})
export class BoardInsertComponent implements OnInit {
  posts: any = {};
  url = 'http://localhost:3000/board-insert';
  constructor(
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this.http.post(this.url, this.posts).map((res: any) => {
      return res;
    }).subscribe(
      res => {
        debugger;
        // this.router.navigate(['board-list']);
      },
      error => {
        alert(error.error.msg);
      }
    )
  }

}
