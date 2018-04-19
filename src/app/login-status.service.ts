import { Injectable } from '@angular/core';

@Injectable()
export class LoginStatusService {
  sessionId: string

  constructor() { }
  setSessionId() {
    this.sessionId = sessionStorage.getItem('id');
  }

}
