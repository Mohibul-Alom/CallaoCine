import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private httpClient: HttpClient) { }

  public getMovies(){

    return this.httpClient.get(`${environment.baseUrl}/movies`);

  }
}
