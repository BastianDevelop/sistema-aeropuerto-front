

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