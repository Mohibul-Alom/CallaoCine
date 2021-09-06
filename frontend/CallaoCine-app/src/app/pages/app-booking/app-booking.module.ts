import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBookingRoutingModule } from './app-booking-routing.module';
import { BookingOptionComponent } from './components/booking-option/booking-option.component';
import { BookingSeatsComponent } from './components/booking-seats/booking-seats.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    BookingOptionComponent,
    BookingSeatsComponent,
  ],
  imports: [
    CommonModule,
    AppBookingRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ]
})
export class AppBookingModule { }
