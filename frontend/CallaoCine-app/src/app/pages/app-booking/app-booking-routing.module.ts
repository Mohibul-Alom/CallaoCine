import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingOptionComponent } from './components/booking-option/booking-option.component';
import { BookingSeatsComponent } from './components/booking-seats/booking-seats.component';


export const routes: Routes = [
  {
    path:'',
    component: BookingOptionComponent,
  },
  {
    path:'seats',
    component: BookingSeatsComponent,
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBookingRoutingModule { }
