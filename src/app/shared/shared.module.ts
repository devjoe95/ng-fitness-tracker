import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [HeaderComponent, SidenavListComponent, WelcomeComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
  ],
})
export class SharedModule {}
