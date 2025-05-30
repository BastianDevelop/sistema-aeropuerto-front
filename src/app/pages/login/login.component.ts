import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
 
  loginData = {
    "username": '',
    "password": '',
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService) { }
  
  ngOnInit(): void {  }

  formSubmit() {
    //console.log('Click en el boton de login');
    if (this.loginData.username.trim() === '' || this.loginData.password.trim() === null) {
      this.snack.open('Username o password vacios', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe((user: any) => {
            this.loginService.setUser(user);
            console.log(user);
            if (this.loginService.getUserRole() === 'ADMIN') {
              // Navegar a la página de administrador
              window.location.href = '/admin';
            }else if (this.loginService.getUserRole() === 'NORMAL') {
              // Navegar a la página de usuario normal
              window.location.href = '/user-dashboard';
            } else {
              this.loginService.logout();
            }
          })
      },(error) => {
        console.log(error);
        this.snack.open('Detalles de usuario incorrectos', 'Aceptar', {
          duration: 3000,
        });
      }

    )
  }

}
