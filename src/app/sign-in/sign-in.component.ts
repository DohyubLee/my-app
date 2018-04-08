import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: any = {};
  url = 'http://localhost:3000/login';
  constructor(
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post(this.url, this.user).subscribe(res => {
      if (res.status === "login") {
        this.router.navigate(['board-list']);  //페이지 이동
      }
   })
  }

}
