import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    // this.returnObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('subs:', valor ),     
    //   error => console.warn('Error:', error),
    //   () => console.info('Obs terminado')
    // );
    this.returnInterval()
      .subscribe( console.log )
  }

  returnInterval(): Observable<number> {

    return interval(500)
            .pipe(
              map( valor => valor +1),
              filter( valor => ( valor % 2 === 0 ) ? true : false ),
              take(10),
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
