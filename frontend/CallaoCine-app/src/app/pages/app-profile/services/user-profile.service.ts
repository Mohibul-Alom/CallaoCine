import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private httpClient: HttpClient) { }

  public getUserTickets(id:string){
    return this.httpClient.get(`${environment.baseUrl}/user/${id}`);
  }

  public getTicketById(id:string){
    return this.httpClient.get(`${environment.baseUrl}/ticket/${id}`);
  }

}
