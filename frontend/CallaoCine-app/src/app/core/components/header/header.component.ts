import { AfterViewInit, ApplicationRef, Component, OnInit } from '@angular/core';
import { Iheader } from 'src/app/models/iapp';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  public isOpen: boolean = false;
  public header:Iheader[] = [

    {
      name:'Home',
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
    
  ]

  constructor(
    private authService: AuthService,
  ) { }

  ngAfterViewInit():void {
    this.logout();
  }

  public showMenu() {
    this.isOpen = !this.isOpen;
  }

  public logout() {

    if(this.authService.isAuthenticated()) {

      console.log('HOLA??',this.authService.isAuthenticated());

      this.header.forEach(element => {
        if(element.name === "Log in"){
          element.name = 'Log out';
          element.navigate = '/home';
        }
      });

      console.log(this.header);
        
    }

  }

}
