import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = null;

  constructor(private route: Router) {}

  setUserSession(u): any {
    localStorage.setItem('userConnect', JSON.stringify(u));
  }

  getUserConnect(): any {
    this.user = JSON.parse(localStorage.getItem('userConnect'));

    return this.user;
  }

  userIsConnected(): boolean {
    const user = this.getUserConnect();
   // console.log('in is conn...' , user);
    if (user != null) {
      return true;
    }
    else {
      return false;
    }
  }

  deconnect(): any {
    localStorage.clear();

    this.route.navigateByUrl('login');
  }
}
