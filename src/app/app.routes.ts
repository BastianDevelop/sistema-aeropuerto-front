
import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

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
  }
  // Puedes dejar pathMatch: 'full' en todas, pero para rutas más complejas o anidadas,
  // a veces se usa 'prefix'. Para este caso simple, no debería ser el problema si navegas bien.
];





/*
import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  }

];
*/
