import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public imageUpload: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
                private userService: UserService,
                private fileUploadService: FileUploadService) {              

                this.user = userService.user;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [ this.user.nombre, Validators.required ],
      email: [ this.user.email, [ Validators.required, Validators.email ] ]
    });
  }

  updateProfile() {
    this.userService.updateProfile( this.profileForm.value )
      .subscribe( resp => {
        const { nombre , email } = this.profileForm.value;
        this.user.nombre = nombre;
        this.user.email = email;
        
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  changeImage( event ) {
    this.imageUpload = event.files[0];

    if( !event.files[0] ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(event.files[0])
    
    reader.onloadend = () => {
      this.imgTemp = reader.result;  
    }
  }

  uploadImage() {

    this.fileUploadService
      .uploadPhoto( this.imageUpload, 'users', this.user.uid )
      .then( img => {
        this.user.img = img;
        Swal.fire('Guardado', 'Imagen guardada con éxito', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Guardado', 'No se pudo subir la imágen', 'error');  
      });
  }

}
