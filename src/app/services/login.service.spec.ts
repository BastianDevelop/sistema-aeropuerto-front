

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // <-- Importa esto
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController; // <-- Declara esto

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- Agrega esta importación para pruebas de HTTP
      providers: [LoginService] // <-- Esto es opcional, pero buena práctica
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController); // <-- Inyecta el controlador de pruebas HTTP
  });

  afterEach(() => {
    httpMock.verify(); // <-- Verifica que no haya solicitudes HTTP pendientes al final de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Puedes añadir más pruebas aquí, por ejemplo:
  // it('should generate a token', () => {
  //   const mockLoginData = { username: 'test', password: 'password' };
  //   const dummyToken = { token: 'xyz123' };

  //   service.generateToken(mockLoginData).subscribe(res => {
  //     expect(res).toEqual(dummyToken);
  //   });

  //   const req = httpMock.expectOne(`${service['baserUrl']}/generate-token`); // Accede a baserUrl
  //   expect(req.request.method).toBe('POST');
  //   req.flush(dummyToken); // Responde con el token ficticio
  // });

});