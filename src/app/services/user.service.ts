import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoadUser } from '../interfaces/load-users.interface';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor( private http: HttpClient,
              private router: Router,
              private ngZone: NgZone ) {
    this.googleInit();
  }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '917631620470-dnavatbficjgobb12cl0kioh2tbssbl6.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }

  saveLocalStorage( token: string, menu: any ) {
    localStorage.setItem('token', token );
        localStorage.setItem('menu', JSON.stringify(menu) );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    
    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  validateToken(): Observable<boolean> {
    
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, img = '', role, uid } = resp.user;
        this.user = new User( nombre, email, '', img, google, role, uid );
        this.saveLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError( error => of(false) )
    );
  }

  createUser( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/users`, formData)
            .pipe(
              tap( (resp: any) => {
                this.saveLocalStorage(resp.token, resp.menu);
              })
            )
  }

  updateProfile( data: { email: string, nombre: string, role: string | undefined }) {

    data = {
      ...data,
      role: this.user.role
    }

    return this.http.put(`${ base_url }/users/${ this.uid }`, data, this.headers )
  }

  login( formData: LoginForm ) {
    return this.http.post(`${ base_url }/login`, formData)
      .pipe(
        tap( (resp: any) => {
          this.saveLocalStorage(resp.token, resp.menu);
        })
      )
  }

  loginGoogle( token ) {
    return this.http.post(`${ base_url }/login/google`, { token } )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token )
        })
      )
  }
  
  loadUSer( from: number = 0 ) {
    const url = `${ base_url }/users?from=${ from }`;
    return this.http.get<LoadUser>(url, this.headers )
      .pipe(
        // delay(2000),
        map( resp => {
          const users = resp.users.map(
             user => new User(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
            );

          return {
            total: resp.total,
            users
          };
        })
      )
  }

  removeUser( user: User ) {
    const url = `${ base_url }/users/${ user.uid }`;
    return this.http.delete(url, this.headers )
  }

  saveUser( user: User) {

    return this.http.put(`${ base_url }/users/${ user.uid }`, user, this.headers )
  }
}
