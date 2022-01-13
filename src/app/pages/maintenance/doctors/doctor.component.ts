import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { DoctorService } from '../../../services/doctor.service';
import { HospitalService } from '../../../services/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public doctorSelected: Doctor;
  public hospitalSelected: Hospital;

  constructor( private fb: FormBuilder,
              private hospitalService: HospitalService,
              private doctorService: DoctorService,
              private router: Router,
              private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ id }) => this.loadDoctor( id ) );
      
      this.doctorForm = this.fb.group({
        name: ['', Validators.required ],
        hospital: [, Validators.required ]
      });
      
      this.loadHospitals();
      
      this.doctorForm.get('hospital').valueChanges
      .subscribe( hospitalId => {
        this.hospitalSelected = this.hospitals.find( h => h._id === hospitalId);         
      })
    }
    
    loadDoctor( id: string) {

    if( id === 'nuevo' ) {
      return;
    }

    this.doctorService.getDoctorById(id)
      .pipe(
        delay(100)
      )
      .subscribe( doctor => {

        if( !doctor ) {
          return this.router.navigateByUrl(`/dashboard/doctors`)
        }

        const { name, hospital: { _id } } = doctor;
        this.doctorSelected = doctor;
        this.doctorForm.setValue({ name, hospital: _id });  
      })
  }

  loadHospitals() {
    this.hospitalService.loadHospital()
      .subscribe( (hospitals: Hospital[]) => {
        this.hospitals = hospitals;  
      });
  }

  saveDoctor() {

    const { name } = this.doctorForm.value;

    if( this.doctorSelected ) {
      const data  = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      }
      this.doctorService.updateDoctor( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ name } actualizado correctamente`, 'success');
        })
    } else {
      this.doctorService.createDoctor( this.doctorForm.value )
        .subscribe( (resp: any) => {
          console.log(resp);
          Swal.fire('Creado', `${ name } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${ resp.doctor.id }`);
        });  
    }
  }
}
