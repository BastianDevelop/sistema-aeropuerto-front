import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-view-categorias',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule 
  ],
  templateUrl: './view-categorias.component.html',
  styleUrl: './view-categorias.component.css'
})
export class ViewCategoriasComponent implements OnInit {

  categorias:any = [  ]

  constructor(private categoriaService:CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato: any) => {
        this.categorias = dato;
        console.log(this.categorias);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al cargar las categorías', 'error');
      }
    )
  }

}
