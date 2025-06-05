
import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriasComponent } from './pages/admin/view-categorias/view-categorias.component';
import { AddCategoriaComponent } from './pages/admin/add-categoria/add-categoria.component';
import { ViewExamenesComponent } from './pages/admin/view-examenes/view-examenes.component';
import { AddExamenComponent } from './pages/admin/add-examen/add-examen.component';
import { ActualizarExamenComponent } from './pages/admin/actualizar-examen/actualizar-examen.component';
import { ViewExamenPreguntasComponent } from './pages/admin/view-examen-preguntas/view-examen-preguntas.component';
import { AddPreguntaComponent } from './pages/admin/add-pregunta/add-pregunta.component';
import { ActualizarPreguntaComponent } from './pages/admin/actualizar-pregunta/actualizar-pregunta.component';
import { LoadExamenComponent } from './pages/user/load-examen/load-examen.component';
import { InstruccionesComponent } from './pages/user/instrucciones/instrucciones.component';
import { StartComponent } from './pages/user/start/start.component';

export const routes: Routes = [
  // Ruta por defecto que redirige a Home
  {
    path: '',
    redirectTo: 'home', // Redirige a la ruta 'home' si la URL está vacía
    pathMatch: 'full'
  },
  // Ruta para el componente Home
  {
    path: 'home', // La URL para home es /home
    component: HomeComponent
  },
  // Ruta para la página de registro
  {
    path: 'signup',
    component: SignupComponent
  },
  // Ruta para la página de inicio de sesión
  {
    path: 'login',
    component: LoginComponent
  },
  // =========================================================================
  // RUTAS PROTEGIDAS
  // =========================================================================

  // Ruta protegida para administradores
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminGuard], // <--- ¡AQUÍ APLICAS EL ADMIN GUARD!
    children:[
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        component: WelcomeComponent // Componente de bienvenida para administradores
      },
      {
        path: 'categorias',
        component: ViewCategoriasComponent
      },
      {
        path: 'add-categoria',
        component: AddCategoriaComponent
      },
      {
        path: 'examenes',
        component: ViewExamenesComponent
      },
      {
        path: 'add-examen',
        component: AddExamenComponent
      },
      {
        path: 'examen/:examenId',
        component: ActualizarExamenComponent
      },
      {
        path: 'ver-preguntas/:examenId/:titulo',
        component: ViewExamenPreguntasComponent
      },
      {
        path: 'add-pregunta/:examenId/:titulo',
        component: AddPreguntaComponent 
      },
      {
        path: 'pregunta/:preguntaId',
        component: ActualizarPreguntaComponent
      }
    ]
  },
  // Ruta protegida para usuarios normales
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard], // <--- ¡AQUÍ APLICAS EL USER GUARD!
    children:[
      {
        path: ':catId',
        component: LoadExamenComponent
      },
      {
        path: 'instrucciones/:examenId',
        component: InstruccionesComponent
      }
    ]
  },
  {
    path: 'start/:examenId',
    component: StartComponent,
    canActivate: [NormalGuard] // Protege la ruta de inicio del examen
  }

];


