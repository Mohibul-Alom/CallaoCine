import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRegisterRoutingModule } from './app-register-routing.module';
import { RegisterViewComponent } from './components/register-view/register-view.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterViewComponent
  ],
  imports: [
    CommonModule,
    AppRegisterRoutingModule,
    ReactiveFormsModule
  ]
})
export class AppRegisterModule { }
