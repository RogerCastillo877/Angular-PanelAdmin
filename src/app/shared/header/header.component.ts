import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user: User;

  constructor( private userService: UserService,
                private router: Router ) {
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }

  search( termn:string ) {
    
    if( termn.length === 0 ) {
      return;
    }
    
    this.router.navigateByUrl(`/dashboard/search/${ termn }`)
  }
}
