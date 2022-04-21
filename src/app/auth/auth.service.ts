import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private user: User | null;

  constructor(private router: Router) {
    this.user = null;
  }

  register(authData: AuthData) {
    this.user = {
      email: authData.email,
      username: String(Math.round(Math.random() * 1000)),
    };
    this.authSuccessfully();
  }
  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      username: String(Math.round(Math.random() * 1000)),
    };
    this.authSuccessfully();
  }
  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigateByUrl('/auth/signin');
  }
  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return this.user != null;
  }
  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigateByUrl('/train');
  }
}
