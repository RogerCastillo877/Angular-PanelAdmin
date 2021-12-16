import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    this.returnObservable().pipe(
      retry()
    ).subscribe(
      valor => console.log('subs:', valor ),     
      error => console.warn('Error:', error),
      () => console.info('Obs terminado')
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>( observer => {
    
      const interval = setInterval( () => {
        i++;
        observer.next(i);
        
        if( i === 4 ) {
          clearInterval( interval );
          observer.complete();
        }

        if( i === 2 ) {
          observer.error('i llego al valor de 2');
        }
      }, 1000)
    });
  }
}
