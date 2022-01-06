import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public hideModal: boolean = true; 

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.hideModal = false;
  }
}
