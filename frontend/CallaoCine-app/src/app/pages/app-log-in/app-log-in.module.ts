import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLogInRoutingModule } from './app-log-in-routing.module';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    AppLogInRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AppLogInModule { }
