import { Component } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent {

  progress: number = 50;

  get getPercentage() {
    return `${this.progress}%`;
  }

  changeValue( value: number ) {

    if( this.progress >= 100 && value >= 0 ){
      return this.progress = 100;
    }

    if( this.progress <= 0 && value < 0 ){
      return this.progress = 0;
    }

    this.progress = this.progress + value;
  }

}
