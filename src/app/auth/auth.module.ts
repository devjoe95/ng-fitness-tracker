import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent, SignUpComponent, SignInComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule, FormsModule],
})
export class AuthModule {}
