import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamenService } from '../../../services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-examen',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    // Módulos de Angular Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './add-examen.component.html',
  styleUrl: './add-examen.component.css'
})
export class AddExamenComponent implements OnInit{

  categorias: any = [];

  examenData = {
    titulo:'',
    descripcion:'',
    puntosMaximos:'',
    numeroDePreguntas:'',
    activo: true,
    categoria:{
    categoriaId:''
    }
  }

  constructor(
    private categoriaService: CategoriaService,
    private snack: MatSnackBar,
    private examenService: ExamenService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato: any) => {
        this.categorias = dato;
        console.log(this.categorias);
      }, (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error al cargar los datos', 'error');
      }
    )
  }

  guardarCuestionario() {
    console.log(this.examenData);
    if (this.examenData.titulo.trim() == '' || this.examenData.titulo == null) {
      this.snack.open('El título es requerido', '', {
        duration: 3000
      });
      return;
    }

    this.examenService.agregarExamen(this.examenData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Examen guardado', 'El examen ha sido guardado con éxito', 'success');
        this.examenData = {
          titulo:'',
          descripcion:'',
          puntosMaximos:'',
          numeroDePreguntas:'',
          activo: true,
          categoria: {
            categoriaId:''
          }
        }
        this.router.navigate(['/admin/examenes']);
      },
      (error) => {
        Swal.fire('Error', 'Error al guardar el examen', 'error');
      }
    )
  }
  
}

