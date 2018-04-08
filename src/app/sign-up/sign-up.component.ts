import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: any = {};
  url = 'http://localhost:3000/register';
  constructor(
    private http: HttpClient, 
    private router: Router) { }
  
  ngOnInit() {
  }
  
  onSubmit() {
    if (!this.user.name) {
      console.log('The name is empty.')
      return;
    }
    if (!this.user.password) {
      console.log('The password is empty.')
      return;
    }
    if (!this.user.email) {
      console.log('The email is empty.')
      return;
    }
    this.http.post(this.url, this.user).subscribe(res => {
      if (res.status === true) {
        this.router.navigate(['sign-in']);  //페이지 이동
      }
    })
    console.log('hi');
    console.log('email:',this.user.email);
    console.log('user',this.user.name);
    console.log('password',this.user.password);
   
  }
}
