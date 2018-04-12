import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: any = {};
  url: string = 'http://localhost:3000/register';
  constructor(
    private http: HttpClient, 
    private router: Router) { }
  
  ngOnInit() {
  }
  
  onSubmit() {
    // this.http.post(this.url, this.user).subscribe(
    //   res => {
    //     alert(res.msg);
    //     this.router.navigate(['sign-in']);
    //   },
    //   error => {
    //     alert(error.error.msg);
    //   }
    // )
    this.http.post(this.url, this.user).map((res: any) => {
      return res;
    }).subscribe(
      res => {
        alert(res.msg);
        this.router.navigate(['sign-in']);
      },
      error => {
        alert(error.error.msg);
      }
    )
  }
}
