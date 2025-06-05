import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
 
  loginData = {
    "username": '',
    "password": '',
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService, private router: Router) { }
  
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
        this.loginService.loginUser(data.token); // Esto guarda el token
        this.loginService.getCurrentUser().subscribe( // Obtienes la info del usuario
          (user: any) => {
            this.loginService.setUser(user); // Guardas la info del usuario (incluyendo roles)
            console.log(user);

            // --- ¡CAMBIO AQUÍ! ---
            if (this.loginService.getUserRole() === 'ADMIN') {
              this.router.navigate(['/admin']); // Navega SIN recargar la página
              this.loginService.loginStatusSubjec.next(true); // Notifica que el usuario ha iniciado sesión
            } else if (this.loginService.getUserRole() === 'NORMAL') {
              this.router.navigate(['/user-dashboard/0']); // Navega SIN recargar la página
              this.loginService.loginStatusSubjec.next(true); // Notifica que el usuario ha iniciado sesión
            } else {
              this.loginService.logout(); // Si no tiene un rol válido, cierra sesión
            }

          },
          (errorUser) => { // Es buena práctica manejar errores también aquí
            console.error('Error al obtener el usuario actual:', errorUser);
            this.snack.open('Error al cargar datos de usuario. Intente de nuevo.', 'Aceptar', {
              duration: 3000,
            });
            this.loginService.logout(); // Cierra sesión si falla la obtención del usuario
          }
        )
      },
      (error) => {
        console.log(error);
        this.snack.open('Detalles de usuario incorrectos', 'Aceptar', {
          duration: 3000,
        });
      }
    )

  }

}
