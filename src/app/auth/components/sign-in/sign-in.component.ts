import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/services/ui.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  errMessage: boolean = false;
  isLoading: boolean = false;
  loadingSubs: Subscription;
  constructor(private authService: AuthService, private uiService: UIService) {
    this.loadingSubs = new Subscription();
  }
  ngOnDestroy(): void {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  onSubmit(f: NgForm) {
    this.authService
      .login({
        email: f.value.email,
        password: f.value.password,
      })
      .catch(() =>
        this.uiService.showSnackBar('Email or password is incorrect')
      );
  }
}
