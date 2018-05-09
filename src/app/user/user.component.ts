import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginStatusService } from '../login-status.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any = {};
  url1: string = 'https://ldhboard.ga/user';
  url2: string = 'https://ldhboard.ga/usermodify';
  url3: string = 'https://ldhboard.ga/userdelete';
  constructor(
    private http: HttpClient,
    private router: Router,
    private loginStatus: LoginStatusService
  ) { }

  ngOnInit() {
    if (!sessionStorage.getItem('id')) {
      this.router.navigate(['sign-in']);
    } else {
      const id = sessionStorage.getItem('num');
      this.http.post(this.url1, {id}).map((res: any) => {
        return res;
      }).subscribe(
        res => {
          this.user = res;
        },
        error => {
          alert(error.error.msg);
        }
      )
    }
  }
  onSubmit() {
    if (!this.user.name) {
      alert("Please enter name");
      return;
    }
    if (!this.user.password) {
      alert("Please enter password");
      return;
    }
    this.http.post(this.url2, this.user).map((res: any) => {
      return res;
    }).subscribe(
      res => {
        alert("modify success");
        this.router.navigate(['board-list']);
      },
      error => {
        alert(error.error.msg);
      }
    )
  }
  delete() {
    if (!this.user.password) {
      alert("Please enter password");
      return;
    }
    const id = sessionStorage.getItem('num');
    this.http.post(this.url3, this.user).map((res: any) => {
      return res;
    }).subscribe(
      res => {
        alert("delete success");
        sessionStorage.clear();
        this.loginStatus.setSessionId();
        this.router.navigate(['sign-in']);
      },
      error => {
        alert(error.error.msg);
      }
    )
  }

}
