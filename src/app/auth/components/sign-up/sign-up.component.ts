import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/services/ui.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  minDate: Date;
  maxDate: Date;
  isLoading: boolean = false;
  loadingSubs: Subscription;
  constructor(private authService: AuthService, private uiService: UIService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.loadingSubs = new Subscription();
  }
  ngOnDestroy(): void {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.minDate.setFullYear(this.minDate.getFullYear() - 60);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }
  onSubmit(f: NgForm) {
    if (f.value.password === f.value.confirmPassword) {
      this.authService
        .register({
          email: f.value.email,
          password: f.value.password,
        })
        .catch(() =>
          this.uiService.showSnackBar(
            'An error has occurred ... Try to register later',
            undefined,
            5000
          )
        );
    } else {
      this.uiService.showSnackBar('Passwords are not matched');
    }
  }
}
