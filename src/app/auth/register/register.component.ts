import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    password: ['1234', [Validators.required] ],
    password2: ['1234', [Validators.required] ],
    terms: ['true', [Validators.required] ],
  }, {
    validators: this.equalPassword('password', 'password2')
  });

  constructor( private fb: FormBuilder) { }

  createUser() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if( this.registerForm.valid ) {
      console.log('Enviando formulario');
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
  
  invalidpassword() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  termsAccepted() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  equalPassword(pass1Name: string, pass2Name: string) {

    return ( formGroup: FormGroup ): any => {
      
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control!.value === pass2Control!.value ) {
        pass2Control!.setErrors(null);
      } else {
        pass2Control!.setErrors({noEsIgual: true});
      }

    }
  }
}
