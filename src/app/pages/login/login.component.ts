import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
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

  //constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {  }











}
