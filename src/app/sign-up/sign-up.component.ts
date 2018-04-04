import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: any = {};
  constructor(private router: Router) { }
  
  ngOnInit() {
  }
  
  onSubmit() {
    console.log('hi');
    console.log('email:',this.user.email);
    console.log('user',this.user.name);
    console.log('password',this.user.password);
    // this.router.navigate(['sign-in']);  //페이지 이동
  }
}
