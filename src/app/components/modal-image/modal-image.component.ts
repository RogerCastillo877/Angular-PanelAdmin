import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  constructor( public modalImageService: ModalImageService,
              public fileUploadService: FileUploadService) { }

  public imageUpload: File;
  public imgTemp: any = null;
  
  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
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

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService
      .uploadPhoto( this.imageUpload, type, id )
      .then( img => {
        Swal.fire('Guardado', 'Imagen guardada con éxito', 'success');
        this.modalImageService.newImage.emit(img);
        this.closeModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Guardado', 'No se pudo subir la imágen', 'error');  
      });
  }
}
