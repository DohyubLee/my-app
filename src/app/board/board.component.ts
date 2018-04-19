import { Component, OnInit } from '@angular/core';
import { LoginStatusService } from '../login-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  
  constructor(
    private loginStatus: LoginStatusService, 
    private router: Router
  ) { }
  ngOnInit() {
    this.loginStatus.setSessionId();
  }
  signOut(): void {
    sessionStorage.clear();
    this.loginStatus.sessionId = "";
    this.router.navigate(['sign-in']);
  }
}
