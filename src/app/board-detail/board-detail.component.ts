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
  url = 'http://localhost:3000/board-detail';
  post: PostDetail;
  userCheck: boolean;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!sessionStorage.getItem('id')) {
      this.router.navigate(['sign-in']);
    } else {
      var curruntUser = parseInt(sessionStorage.getItem('num'));
      const id = this.route.snapshot.paramMap.get('id')
      this.http.post(this.url, {id}).map((res: PostDetail) => {
        res.saveDate = moment(res.saveDate).format("YYYY-MM-DD HH:mm:ss");
        return res;
      }).subscribe(
        res => {
          this.post = res;
          if (curruntUser === res.user_id) {
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

}
