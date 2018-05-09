import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostEdit } from '../post-edit';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.css']
})
export class BoardEditComponent implements OnInit {
  url1 = 'https://ldhboard.ga/board-edit';
  url2 = 'https://ldhboard.ga/board-edit-save';
  post: PostEdit;
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    if (!sessionStorage.getItem('id')) {
      this.router.navigate(['sign-in']);
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.http.post(this.url1, {id}).map((res: PostEdit) => {
        return res;
      }).subscribe(
        res => {
          this.post = res;
        },
        error => {
          alert(error.error.msg);
        }   
      )
    }
  }
  onSubmit() {
    if (!this.post.title) {
      alert("Please enter title");
      return;
    }
    if (!this.post.description) {
      alert("Please enter description");
      return;
    }
    this.http.post(this.url2, this.post).map((res: any) => {
      return res;
    }).subscribe(
      res => {
        alert("modify success");
        this.router.navigate(['board-detail/'+res.postId]);
      },
      error => {
        alert(error.error.msg);
      }
    )
  }

  goBack(): void {
    this.location.back();   //뒤로가기 기능
  }

}
