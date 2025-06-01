

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper'; // Asegúrate de que la ruta a helper.ts sea correcta
import { Router } from '@angular/router'; // Importa Router para redirecciones internas en el servicio

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  // Inyectamos también el Router para posibles redirecciones dentro del servicio (ej. en logout)
  constructor(private http: HttpClient, private router: Router) { }

  // Generamos el token (llamada al backend)
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  // Obtenemos el usuario actual (llamada al backend)
  public getCurrentUser() {
    return this.http.get(`${baserUrl}/actual-usuario`);
  }

  // Iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // Verificamos si el usuario está logueado
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    // Considera añadir validación de token expirado aquí también, usando alguna librería JWT o decodificación básica
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // Cerramos sesión y eliminamos el token y el usuario del localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubjec.next(false); // Notifica a los suscriptores que el estado de login cambió
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

  // Obtenemos el token del localStorage
  public getToken() {
    return localStorage.getItem('token');
  }

  // Guardamos la información del usuario en el localStorage
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtenemos la información del usuario del localStorage
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      // Si no hay usuario en localStorage PERO hay token,
      // esto podría indicar que la sesión está a medias o que el usuario no se guardó bien.
      // Aquí podrías decidir si redirigir o intentar obtener el usuario de nuevo.
      // Por ahora, mantendremos el logout para asegurar un estado limpio.
      if (this.getToken()) { // Si hay token pero no hay user, hay un problema.
        console.warn('Advertencia: Token presente pero información de usuario no encontrada. Cerrando sesión.');
      }
      this.logout(); // Si no hay usuario en localStorage, se cierra la sesión
      return null;
    }
  }

  // Obtenemos el rol del usuario (asumiendo que user.authorities[0].authority existe)
  public getUserRole() {
    let user = this.getUser();
    if (user && user.authorities && user.authorities.length > 0) {
      return user.authorities[0].authority; // ¡CORRECCIÓN AQUÍ!
    }
    // Si no se encuentra el rol, o user es null, o authorities está vacío
    return null; // O puedes retornar una cadena vacía '' o un rol por defecto 'GUEST'
  }

}





/*
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baserUrl from './helper'; // Asegúrate de que la ruta a helper.ts sea correcta

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // Generamos el token (llamada al backend)
  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  // Obtenemos el usuario actual (llamada al backend)
  public getCurrentUser() {
    return this.http.get(`${baserUrl}/actual-usuario`);
  }

  // Iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  // Verificamos si el usuario está logueado
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // Cerramos sesión y eliminamos el token y el usuario del localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // Obtenemos el token del localStorage
  public getToken() {
    return localStorage.getItem('token');
  }

  // Guardamos la información del usuario en el localStorage
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtenemos la información del usuario del localStorage
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout(); // Si no hay usuario en localStorage, se cierra la sesión
      return null;
    }
  }

  // Obtenemos el rol del usuario (asumiendo que user.authorities[0].authority existe)
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authorities; // Retorna null si no se puede obtener el rol
  }

}
*/