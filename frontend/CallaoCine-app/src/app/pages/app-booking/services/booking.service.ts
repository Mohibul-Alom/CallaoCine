import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  public getMoviesByName(name: string){
    return this.httpClient.get(`${environment.baseUrl}/movies/title/${name}`);
  }

  public getAuditorum(id:string){
    return this.httpClient.get(`${environment.baseUrl}/auditorium/${id}`);
  }

  public getSessionsByMovieId(movieId:string){
    return this.httpClient.get(`${environment.baseUrl}/session/movie/${movieId}`)
  }

  public getSessionById(id:string){ 
    return this.httpClient.get(`${environment.baseUrl}/session/${id}`);
  }

  public postTickets(hasPaid:string,timeLeft:string,day:string,auditorium:string,seat:string,movie:string ){
    return this.httpClient.post<any>(
      `${environment.baseUrl}/ticket/create`,
      {
        hasPaid,
        timeLeft,
        day,
        auditorium,
        seat,
        movie
      }
    );
  }

  public addTicketUser(userId:string,ticketId:string){
    return this.httpClient.put<any>(
      `${environment.baseUrl}/user/add-ticket`,
      {
        userId,
        ticketId
      }
    )
  }


}
