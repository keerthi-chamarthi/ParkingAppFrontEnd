import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckGuard implements CanActivate {
  constructor(private route: Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem("token")!=null){
        this.route.navigateByUrl('/profile');
        return false;
      }
      else if(localStorage.getItem("admintoken")!=null){
        this.route.navigateByUrl('/response');
        return false;
      }
      else{
        return true;
      }
  }
  
}
