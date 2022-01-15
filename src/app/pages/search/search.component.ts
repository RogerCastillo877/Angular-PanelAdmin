import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchesService } from '../../services/searches.service';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor( private activatedToute: ActivatedRoute,
                private searchesService: SearchesService ) { }

  ngOnInit(): void {

    this.activatedToute.params
      .subscribe( ({ termn })  => this.globalSearch( termn ));
  }

  globalSearch( termn: string ) {
    
    this.searchesService.globalSearch( termn )
      .subscribe( (resp: any) => {
        this.users = resp.users;
        this.doctors = resp.doctors;
        this.hospitals = resp.hospitals;
      });
  }

  openDoctor( doctor ) {
    
  }
}
