import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { UIService } from '../shared/services/ui.service';
import { endLoading, startLoading } from '../store/actions/ui.action';
import { State } from '../store/state';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private store: Store<{ ui: State }>
  ) {
    this.isAuthenticated = false;
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/', 'train']);
        this.getUser();
      } else {
        this.authChange.next(false);
        this.router.navigate(['/', 'auth', 'signin']);
        this.isAuthenticated = false;
      }
    });
  }
  register(authData: AuthData): Promise<void> {
    this.store.dispatch(startLoading());
    return this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {})
      .catch((err) => console.error(err))
      .finally(() =>
        this.store.dispatch(endLoading())
      );
  }
  login(authData: AuthData): Promise<void> {
    this.store.dispatch(startLoading());

    return this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {})
      .finally(() =>  this.store.dispatch(endLoading()));
  }
  logout() {
    this.fireAuth.signOut();
  }
  getUser() {
    // this.fireAuth.user.subscribe((user) => console.log(user));
  }
  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
