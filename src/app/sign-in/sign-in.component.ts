import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginStatusService } from '../login-status.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: any = {};
  url = 'https://ldhboard.ga/login';
  constructor(
    private http: HttpClient,
    private router: Router,
    private loginStatus: LoginStatusService) { }

  ngOnInit() {
    if (sessionStorage.getItem('id')) {
      this.router.navigate(['board-list']);
    }
  }
  
  onSubmit() {
    this.http.post(this.url, this.user).map((res: any) => {
      return res;
    }).subscribe(
      res => {
        sessionStorage.setItem('id', res.email);
        sessionStorage.setItem('num', res.userNum);
        this.loginStatus.sessionId = sessionStorage.getItem('id')
        this.router.navigate(['board-list']);
      },
      error => {
        alert(error.error.msg);
      }
    )
  }
}
