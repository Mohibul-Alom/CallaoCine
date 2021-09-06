import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IapiSeat, IapiSessions, IapiUser } from 'src/app/models/iapi';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-seats',
  templateUrl: './booking-seats.component.html',
  styleUrls: ['./booking-seats.component.scss']
})
export class BookingSeatsComponent implements OnInit {

  private sessionId!:string;
  
  public session!:IapiSessions;

  public seatRows:IapiSeat[][]=[];
  public seatsSelected:String[] = [];


  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private nextRoute:Router,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) =>{
      this.sessionId = params['idSession']
    })
    this.getSession(this.sessionId);

  }

  public onSeatClick(event:any,seat:IapiSeat):void {

    const seatDiv = (document.getElementById(event.target.id) as HTMLElement);
    if( seatDiv.classList.contains("seat") && !seatDiv.classList.contains("occupied")){

      seatDiv.classList.toggle("selected");
      if(seatDiv.classList.contains("selected")){
        this.seatsSelected.push(seat._id);       
      }else{
        const index = this.seatsSelected.indexOf(seat._id);
        if(index > -1){
          this.seatsSelected.splice(index, 1);
        }
      }   
    }
  }


  public buySeats(){

    let userData = localStorage.getItem('userInfo'); //TODO: really?? 😒😒
    
    if(userData){
      const user:IapiUser = JSON.parse(userData);

              //TODO: 😱😱😱 ¡¡arregla esta chapuza por favor!!😱😱😱
      
      this.seatsSelected.forEach((seat)=>{
        this.bookingService.postTickets(
          "false",
          "30",
          `${this.session.date}`,
          `${this.session.auditorium}`,
          `${seat}`,
          `${this.session.movie}`,
          ).subscribe({
            next:data => {
              
              this.bookingService.addTicketUser(user._id,data._id).subscribe({
                next:data => {
                  
                  this.nextRoute.navigate(['profile']);
                },
                error:error => {
                  console.log(error);
                }
              })

            },
            error:error => {
              console.log(error);
            }
          })

      })

    }

  }


  private getSession(id:string):void {
      this.bookingService.getSessionById(id).subscribe(
        (data:any) =>{
          this.trasformDataSession(data);
          this.sliceSeats(this.session.seats);
        },
        (err) =>{
          console.log(err);
        }
      )
  }

  private sliceSeats(seats:IapiSeat[]): void {

    this.seatRows[0] = seats.slice(0,8); 
    this.seatRows[1] = seats.slice(8,16); 
    this.seatRows[2] = seats.slice(16,24);
    this.seatRows[3] = seats.slice(24,32);
    this.seatRows[4] = seats.slice(32,40);
    this.seatRows[5] = seats.slice(40,48);
    this.seatRows[6] = seats.slice(48,56);
    this.seatRows[7] = seats.slice(56,64);
  }

  private trasformDataSession(data:IapiSessions): void{

    const { _id, date, movie, seats, auditorium } = data;

    this.session = {
      _id, 
      date, 
      movie, 
      seats, 
      auditorium
    }

  }


}
