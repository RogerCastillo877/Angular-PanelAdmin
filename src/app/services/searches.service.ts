import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadUser } from '../interfaces/load-users.interface';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformUser ( results: any[] ): User[] {
    return results.map(
      user => new User(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }
  
  private transformHospitals ( results: any[] ): Hospital[] {
    return results;
  }

  private transformDoctors ( results: any[] ): Doctor[] {
    return results;
  }

  search(type: 'users'|'doctors'|'hospitals', termn: string) {  
    const url = `${ base_url }/todo/collection/${ type }/${ termn }`;
    return this.http.get<any[]>(url, this.headers)    
      .pipe(
        map( (resp: any) => {
          switch (type) {
            case 'users':
              return this.transformUser( resp.result )
            case 'hospitals':
              return this.transformHospitals( resp.result )
            case 'doctors':
              return this.transformDoctors( resp.result )
            default:
              return [];
          }
        })
      )
  }
}
