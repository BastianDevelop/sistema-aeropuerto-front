import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
