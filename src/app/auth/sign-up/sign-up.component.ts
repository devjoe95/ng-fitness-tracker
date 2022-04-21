import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  constructor(private authService: AuthService) {
    this.minDate = new Date();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.minDate.setFullYear(this.minDate.getFullYear() - 60);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  onSubmit(f: NgForm) {
    this.authService.register({
      email: f.value.email,
      password: f.value.password,
    });
    console.log(f.value);
  }
}
