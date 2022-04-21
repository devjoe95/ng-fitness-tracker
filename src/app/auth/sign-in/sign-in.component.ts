import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(private authService: AuthService) {}

  onSubmit(f: NgForm) {
    this.authService.login({
      email: f.value.email,
      password: f.value.password,
    });
  }
}
