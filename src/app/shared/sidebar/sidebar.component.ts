import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public imgUrl = '';
  public userName = '';
  // public user = User;

  constructor( public sidebarService: SidebarService,
              private userService: UserService ) {

    this.imgUrl = userService.user.imageUrl;
    this.userName = userService.user.nombre;
    // this.user = userService.user;
  }

  ngOnInit(): void {
  }

}
