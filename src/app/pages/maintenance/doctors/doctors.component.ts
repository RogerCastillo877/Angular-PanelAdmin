import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor.model';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public doctors: Doctor[] = [];
  private imgSubs: Subscription;

  constructor( private doctorService: DoctorService,
              private modalImageService: ModalImageService,
              private searchesService: SearchesService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.loadDoctors();

    this.imgSubs = this.modalImageService.newImage
      .pipe( delay(100) )
      .subscribe( img => this.loadDoctors() );
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.loadDoctors()
      .subscribe( doctors => {
        this.loading = false;
        this.doctors = doctors
      })
  }

  search( termn: string ) {

    ( termn.length === 0) && this.loadDoctors();

    this.searchesService.search( 'doctors', termn )
      .subscribe( (resp: any[]) => {
        this.doctors = resp;
      })
  }

  openModal(doctor: Doctor) {
    this.modalImageService.openModal( 'doctors', doctor._id, doctor.img);
  }

  deleteDoctor( doctor: Doctor ) {

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${ doctor.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar'
    }).then( (result) => {
      if( result.value ) {
        this.doctorService.deleteDoctor( doctor._id )
          .subscribe( resp => {
            
            this.loadDoctors();
            Swal.fire(
              'Usuario borrado',
              `${ doctor.name } fue eliminado correctamente`,
              'success'
            )
          }
          );
      }
    })
  }
}
