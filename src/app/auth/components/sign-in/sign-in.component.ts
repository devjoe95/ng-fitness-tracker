import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/services/ui.service';
import { State } from 'src/app/store/state';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  errMessage: boolean = false;
  isLoading: boolean = false;
  loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ ui: State }>
  ) {
    this.loadingSubs = new Subscription();
  }

  ngOnInit(): void {
    this.store.select('ui').subscribe((state) => {
      console.log(state);
      this.isLoading = state.isLoading;
    });
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
