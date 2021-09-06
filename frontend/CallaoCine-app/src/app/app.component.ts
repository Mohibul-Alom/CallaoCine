import { Component } from '@angular/core';
import { Iheader } from './models/iapp';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public header:Iheader[] = [

    {
      name:'home',
      navigate:'/home'
    },
    {
      name:'Profile',
      navigate:'/profile'
    },
    {
      name:'Log in',
      navigate:'/login'
    },
    {
      name:'Register',
      navigate:'/register'
    }
    
  ]



}
