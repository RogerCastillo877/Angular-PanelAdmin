import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private userService: UserService,
                private router: Router ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      if( this.userService.user.role === 'ADMIN_ROLE' ) {
        return true;
      } else {
        this.router.navigateByUrl('/dashboard');
        return false;
      }
      // return (this.userService.user.role === 'ADMIN_ROLE') ? true : false;
  }
  
}
