import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../../services/examen.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-view-examenes',
  standalone: true,
  imports: [
    CommonModule,     // Necesario para *ngFor
    RouterModule,     // Necesario para [routerLink]
    MatCardModule,    // Para mat-card y sus subcomponentes
    MatButtonModule,  // Para todos los tipos de botones de Material
    MatIconModule     // Importa si 'example-header-image' usa <mat-icon> o si planeas agregar íconos
  ],
  templateUrl: './view-examenes.component.html',
  styleUrl: './view-examenes.component.css'
})
export class ViewExamenesComponent implements OnInit{

    examenes : any = [  ]

    constructor(private examenService:ExamenService) { }

  ngOnInit(): void {
    this.examenService.listarCuestionarios().subscribe(
      (dato: any) => {
        this.examenes = dato;
        console.log(this.examenes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los exámenes', 'error');
      }
    )
  }



  eliminarExamen(examenId: any) {
    Swal.fire({
      title: 'Eliminar examen',
      text: '¿Estás seguro de eliminar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.eliminarExamen(examenId).subscribe(
          (data) => {
            this.examenes = this.examenes.filter((examen: any) => examen.examenId != examenId);
            Swal.fire('Examen eliminado', 'El examen ha sido eliminado de la base de datos', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar el examen', 'error');
          }
        )
      }
    })
  }



}
