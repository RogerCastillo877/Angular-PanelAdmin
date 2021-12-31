import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit {

  public totalUsers: number= 0;
  public users: User[] = [];
  public from: number = 0;
  public loading: boolean = true;

  constructor( private userService: UserService) { }

  ngOnInit(): void {
    
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUSer(this.from)
      .subscribe( ({ total, users }) => {
        this.totalUsers = total;
        this.users = users;
        this.loading = false;
      })
  }

  changePage(valor: number) {
    this.from += valor;

    if( this.from < 0 ) {
      this.from = 0
    } else if ( this.from > this.totalUsers ) {
      this.from -= valor;
    }
    this.loadUsers();
  }

}
