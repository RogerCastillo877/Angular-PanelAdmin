import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit{
  
  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  // @Input('value') progress: number = 50;
  @Input() progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() emitedValue: EventEmitter<number>= new EventEmitter();

  changeValue( value: number ) {

    if( this.progress >= 100 && value >= 0 ){
      this.emitedValue.emit(100);
      return this.progress = 100;
    }

    if( this.progress <= 0 && value < 0 ){
      this.emitedValue.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.emitedValue.emit(this.progress);
  }

}
