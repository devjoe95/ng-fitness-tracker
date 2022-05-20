import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { StopTrainingComponent } from './training/components/current-training/stop-training.component';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { uiReducer } from './store/reducers/ui.reducer';

@NgModule({
  declarations: [AppComponent, StopTrainingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    StoreModule.forRoot({ ui: uiReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent],
})
export class AppModule {}
