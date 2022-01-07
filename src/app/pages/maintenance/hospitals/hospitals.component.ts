import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs: Subscription

  constructor( private hospitalService: HospitalService,
                private modalImageService: ModalImageService ) { }

  ngOnInit(): void {
    this.loadHospitals();

    this.imgSubs = this.modalImageService.newImage
      .pipe( delay(100) )
      .subscribe( img => this.loadHospitals() );
  }

  loadHospitals() {

    this.loading = true;
    this.hospitalService.loadHospital()
      .subscribe( hospitals => {
        this.loading = false;
        this.hospitals = hospitals; 
      })
  }

  saveChanges( hospital: Hospital ) {
    this.hospitalService.updateHospital( hospital._id, hospital.name)
      .subscribe( resp => {
        Swal.fire( 'Actualizado', hospital.name, 'success' );
      });
  }

  removeHospital( hospital: Hospital ) {
    this.hospitalService.deleteHospital( hospital._id)
      .subscribe( resp => {
        this.loadHospitals();
        Swal.fire( 'Borrado', hospital.name, 'success' );
      });
  }

  async openSweetAlert() {
    const {value} = await Swal.fire<string>({
      title: 'Agregar Hospital',
      text: 'Ingrese el nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese nombre del hospital',
      showCancelButton: true,
    })

    if( value.trim().length > 0 ) {
      this.hospitalService.createHospital( value )
        .subscribe( (resp: any) => {
          this.hospitals.push( resp.hospital )          
        })
    }
    
  }

  openModal( hospital: Hospital ) {
    this.modalImageService.openModal( 'hospitals', hospital._id, hospital.img)
  }
}
