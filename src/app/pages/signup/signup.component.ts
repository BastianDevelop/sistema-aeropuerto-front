import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      alert('El nombre de usuario es requerido !!');
      return;
    };



    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        alert('Usuario guardado, registrado con exito en el sistema');
      }, (error) => {
        console.log(error);
        alert('Ha ocurrido un error en el sistema !!');
      }
    )

  }


}


