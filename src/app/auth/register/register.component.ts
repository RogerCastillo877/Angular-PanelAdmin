import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Rocas', [Validators.required] ], 
    email: ['test@email.com', [Validators.required, Validators.email] ],
    password: ['', [Validators.required] ],
    password2: ['', [Validators.required] ],
    terms: ['false', [Validators.required] ],
  });

  constructor( private fb: FormBuilder) { }

  createUser() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if( this.registerForm.valid ) {
      console.log('Enciando formulario');
    } else {
      console.log('Formulario inválido...');  
    }
  }

  invalidField( field: string ): boolean {

    if( this.registerForm.get(field)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  termsAccepted() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

}
