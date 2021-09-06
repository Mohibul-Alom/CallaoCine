import { Component, OnInit } from '@angular/core';
import { IapiTicket, IapiUser } from 'src/app/models/iapi';
import { IuserData } from '../../models/iuser-data';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  public userTickets:IapiTicket[] = [];

  constructor(private profileService: UserProfileService) { }

  ngOnInit(): void {
    this.getUserTickets();
  }

  private getUserTickets(){

    let userData = localStorage.getItem('userInfo'); //TODO: really?? 😒😒
    if(userData){
      const user:IapiUser = JSON.parse(userData);

      this.profileService.getUserTickets(user._id).subscribe(
        (data: any) => {
          data.tickets.forEach((ticket:string) => {
            this.getTickets(ticket);
          });

          console.log(this.userTickets);

        },
        (err: any) => {
          console.log(err);
        }
      )
    }
  }

  private getTickets(id:string){
    
    this.profileService.getTicketById(id).subscribe(

      (ticket: any) => {

        this.transformTicket(ticket);
      },
      (err: any) => {
        console.log(err);
      }

    )


  }

  private transformTicket(ticket:IapiTicket){

    const { hasPaid, timeLeft, day, auditorium, seat, movie} = ticket;

    const auxTicket = {
      hasPaid, 
      timeLeft, 
      day: new Date(day), 
      auditorium, 
      seat, 
      movie
    }

    this.userTickets.push(auxTicket);
  }



}
