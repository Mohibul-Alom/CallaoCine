import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppProfileRoutingModule } from './app-profile-routing.module';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';


@NgModule({
  declarations: [
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    AppProfileRoutingModule
  ]
})
export class AppProfileModule { }
