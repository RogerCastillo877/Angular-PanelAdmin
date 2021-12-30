import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;

  constructor( private fb: FormBuilder,
              private userService: UserService) {

                this.user = userService.user;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [ this.user.nombre, Validators.required ],
      email: [ this.user.email, [ Validators.required, Validators.email ] ]
    });
  }

  updateProfile() {
    this.userService.updateProfile( this.profileForm.value )
      .subscribe( resp => {
        const { nombre , email } = this.profileForm.value;
        this.user.nombre = nombre;
        this.user.email = email;        
      })
  }

}
