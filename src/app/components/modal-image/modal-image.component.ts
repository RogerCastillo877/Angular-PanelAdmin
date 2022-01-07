import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  
  constructor( public modalImageService: ModalImageService ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalImageService.closeModal();
  }
}
