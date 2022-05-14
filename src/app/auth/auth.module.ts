import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent, SignUpComponent, SignInComponent],
  imports: [
    AuthRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    SharedModule,
  ],
})
export class AuthModule {}
