import { CommonModule, LocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PreguntaService } from '../../../services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule  
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit, OnDestroy {

  examenId:any;
  preguntas:any;
  puntosConseguidos = 0;
  respuestasCorrectas = 0;
  intentos = 0;

  esEnviado = false;
  timer:any;
  private popStateSubscription: any;
  private timerIntervalId: any;

  private readonly TIMER_KEY = 'examen_timer_'; // Usaremos examenId para hacerla única por examen
  private readonly EXAMEN_ENVIADO_KEY = 'examen_enviado_'; // Para saber si ya se envió el examen


  constructor(
    private locationSt:LocationStrategy,
    private route:ActivatedRoute,
    private preguntaService:PreguntaService ) { }

  

  ngOnInit(): void {
    this.prevenirElBotonDeRetroceso();
    this.examenId = this.route.snapshot.params['examenId'];
    console.log(this.examenId);
    this.cargarPreguntas();
  }

  ngOnDestroy(): void {
    if (this.popStateSubscription) {
      this.popStateSubscription.unsubscribe();
    }
    if (this.timerIntervalId) { // Usa timerIntervalId aquí para limpiar el intervalo
      clearInterval(this.timerIntervalId);
    }
    // ¡IMPORTANTE! Si el examen NO ha sido enviado, guarda el tiempo restante
    if (!this.esEnviado) {
      localStorage.setItem(this.TIMER_KEY + this.examenId, this.timer.toString());
    }
  }

  cargarPreguntas() {
    // Primero, verifica si el examen ya fue enviado
    if (localStorage.getItem(this.EXAMEN_ENVIADO_KEY + this.examenId) === 'true') {
      this.esEnviado = true; // Si ya se envió, muestra el resultado final
      // Aquí podrías cargar los resultados si los guardaste también en localStorage
      // O simplemente indicar que ya se completó el examen
      Swal.fire('Examen Completado', 'Ya has enviado este examen.', 'info');
      // Redirige al inicio o a otra página si no quieres que vean el resultado aquí
      // this.router.navigate(['/user-dashboard/0']);
      return;
    }
    this.preguntaService.listarPreguntasDelExamenParaLaPrueba(this.examenId).subscribe(
      (data: any) => {
        console.log(data);
        this.preguntas = data;

        // Cargar el temporizador desde localStorage o inicializarlo
        const storedTimer = localStorage.getItem(this.TIMER_KEY + this.examenId);
        if (storedTimer && !isNaN(Number(storedTimer))) {
          this.timer = Number(storedTimer);
        } else {
          // Inicializar el timer si no hay uno guardado o si está corrupto
          this.timer = this.preguntas.length * 2 * 60;
        }

        this.preguntas.forEach((p: any) => {
          // Aquí también podrías cargar las respuestas dadas si las guardas en localStorage
          // Por ahora, solo se reinician
          p['respuestaDada'] = '';
        });
        console.log(this.preguntas);
        this.iniciarTemporizador();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar las preguntas de la prueba', 'error');
      }
    );
  }

//  iniciarTemporizador() {
//    let t = window.setInterval(() => {
//      if (this.timer <= 0) {
//        this.evaluarExamen();
//        clearInterval(t);
//      } else {
//        this.timer--;
//      }
//    }, 1000)
//  }

  iniciarTemporizador() {
    if (this.timerIntervalId) {
      return;
    }
    this.timerIntervalId = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluarExamen();
        clearInterval(this.timerIntervalId);
        this.timerIntervalId = null;
        // Marca el examen como enviado si el tiempo se agotó
        localStorage.setItem(this.EXAMEN_ENVIADO_KEY + this.examenId, 'true');
        localStorage.removeItem(this.TIMER_KEY + this.examenId); // Limpia el timer guardado
      } else {
        this.timer--;
        // Guarda el tiempo restante cada cierto intervalo (o cada segundo para mayor precisión)
        localStorage.setItem(this.TIMER_KEY + this.examenId, this.timer.toString());
      }
    }, 1000);
  }

//  prevenirElBotonDeRetroceso() {
//    history.pushState(null, null!, location.href);
//    this.locationSt.onPopState(() => {
//      history.pushState(null, null!, location.href);
//    })
//  }

  prevenirElBotonDeRetroceso() {
    // Reemplaza la entrada actual del historial con una nueva, para "cortar" el historial anterior.
    // Esto es más robusto que solo añadir.
    history.pushState(null, '', location.href);

    // Suscribe al evento popstate. Cuando el usuario presiona "atrás", este evento se dispara.
    this.popStateSubscription = this.locationSt.onPopState(() => {
      // Cuando el usuario presiona "atrás", inmediatamente empuja la URL actual de nuevo al historial.
      // Esto hace que el navegador "vuelva" a la misma página.
      history.pushState(null, '', location.href);
    });
  }


  enviarCuestionario() {
    Swal.fire({
      title: '¿Quieres enviar el examen?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluarExamen();
      }
    })
  }

//  evaluarExamen() {
//    this.preguntaService.evaluarExamen(this.preguntas).subscribe(
//      (data: any) => {
//        console.log(data);
//        this.puntosConseguidos = data.puntosMaximos;
//        this.respuestasCorrectas = data.respuestasCorrectas;
//        this.intentos = data.intentos;
//        this.esEnviado = true;
//      },
//      (error) => {
//        console.log(error);
//      }
//    )
//  }

  evaluarExamen() {
    // Detener el temporizador inmediatamente al enviar el examen
    if (this.timerIntervalId) {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = null;
    }
    // Marca el examen como enviado
    this.esEnviado = true;
    localStorage.setItem(this.EXAMEN_ENVIADO_KEY + this.examenId, 'true');
    localStorage.removeItem(this.TIMER_KEY + this.examenId); // Limpia el timer guardado

    this.preguntaService.evaluarExamen(this.preguntas).subscribe(
      (data: any) => {
        console.log(data);
        this.puntosConseguidos = data.puntosMaximos;
        this.respuestasCorrectas = data.respuestasCorrectas;
        this.intentos = data.intentos;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Hubo un error al evaluar el examen', 'error');
      }
    );
  }

//  obtenerHoraFormateada() {
//    let mm = Math.floor(this.timer / 60);
//    let ss = this.timer - mm * 60;
//    return `${mm} : min : ${ss} seg`;
//  }

  obtenerHoraFormateada() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm < 10 ? '0' + mm : mm} : min : ${ss < 10 ? '0' + ss : ss} seg`; // Formateo con 0 inicial
  }

  imprimirPagina() {
    window.print();
  }
}
