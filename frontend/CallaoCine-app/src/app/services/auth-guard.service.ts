import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private route: Router,
  ) { }
  
  //TODO: puedes mejorar esto leyendo mas la documentacion 😉😉
  
  canActivate(){
    if(this.authService.isAuthenticated()){
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }


  
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot,
  // ):Observable<boolean> | Promise<boolean> | boolean{
    
  //   return new Promise(resolve => {

  //     this.authService.isAuthenticated()
  //       .then((status:boolean) => {
  //         if(!status){
  //           this.route.navigate(['login']);
  //         }
  //         resolve(status)
  //       })
  //       .catch((err:any)=>{
  //         console.log(err);
  //         this.route.navigate(['login']);
  //         resolve(false);

  //       })

  //   })


  // }
}
