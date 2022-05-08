import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  errMessage: boolean = false;
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit(f: NgForm) {
    this.authService
      .login({
        email: f.value.email,
        password: f.value.password,
      })
      .catch(() => this._snackBar.open('Email or password is wrong', 'Hide'));
  }
}
