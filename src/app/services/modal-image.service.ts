import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;

  get hideModal() {
    return this._hideModal;
  }

  openModal() {
    this._hideModal = false;
  }
  closeModal() {
    this._hideModal = true;
  }

  constructor() { }
}
