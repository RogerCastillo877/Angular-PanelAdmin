import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from '../../../models/user.model';

import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { delay } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number= 0;
  public users: User[] = [];
  public usersTemp: User[] = [];

  public imgSubs: Subscription;
  public from: number = 0;
  public loading: boolean = true;

  constructor( private userService: UserService,
                private searchesService: SearchesService,
                private modalImageService: ModalImageService) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();

    this.imgSubs = this.modalImageService.newImage
      .pipe( delay(100) )
      .subscribe( img => this.loadUsers() );
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUSer(this.from)
      .subscribe( ({ total, users }) => {
        this.totalUsers = total;
        this.users = users;
        this.usersTemp = users;
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

  search(termn: string) {

    if( termn.length === 0 ) {
      return this.users = this.usersTemp;
    }
    this.searchesService.search('users', termn)
      .subscribe( ( resp: any ) => {
        this.users = resp;
      })   
  }

  deleteUser( user: User ) {
    
    if( user.uid === this.userService.uid ) {
      return Swal.fire('Error', 'No puede eliminarse a si mismo', 'error')
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ user.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar'
    }).then( (result) => {
      if( result.value ) {
        this.userService.removeUser( user )
          .subscribe( resp => {
            
            this.loadUsers();
            Swal.fire(
              'Usuario borrado',
              `${ user.nombre } fue eliminado correctamente`,
              'success'
            )
          }
          );
      }
    })
  }

  changeRole(user: User) {
    this.userService.saveUser( user )
      .subscribe( resp => {       
      })
  }

  openModal( user: User ) {
    this.modalImageService.openModal('users', user.uid, user.img);
  }
}
