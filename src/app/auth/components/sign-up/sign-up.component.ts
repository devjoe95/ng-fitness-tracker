import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UIService } from 'src/app/shared/services/ui.service';
import { State } from 'src/app/store/state';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ ui: State }>
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.minDate.setFullYear(this.minDate.getFullYear() - 60);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.store.select('ui').subscribe((state) => {
      console.log(state);
      this.isLoading = state.isLoading;
    });
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
