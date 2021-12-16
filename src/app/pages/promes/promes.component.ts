import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promes',
  templateUrl: './promes.component.html',
  styles: [
  ]
})
export class PromesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promise = new Promise( (resolve, reject ) => {

    //   if( false ){
    //     resolve('hola');
    //   } else {
    //     reject('Salio mal')
    //   }
      
    // });

    // promise
    //   .then( () => {
    //     console.log('Termine'); 
    //   })
    //   .catch( error => console.log("Error en la promesa", error) ); 
    this.getUsers().then( users => {
      console.log(users);
    } );
  }

  getUsers() {

    return new Promise( resolve => {
      
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => console.log( body.data) );
    })
    
  }
}
