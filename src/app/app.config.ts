import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { AuthInterceptor } from './services/auth.interceptor';
import {
  NgxUiLoaderModule,
  NgxUiLoaderHttpModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from 'ngx-ui-loader';

const ngxUiLoaderGlobalConfig: NgxUiLoaderConfig = {
  // ¡Aquí el cambio de color a un rojo bravo!
  fgsColor: "#FF0000", // Rojo puro
  pbColor: "#FF0000", // Rojo puro
  text: "Espere por favor...",
  textColor: "#FF0000", // También el texto en rojo
  fgsType: SPINNER.ballSpinClockwise,
  fgsPosition: POSITION.centerCenter,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    importProvidersFrom(
      NgxUiLoaderModule.forRoot(ngxUiLoaderGlobalConfig),
      NgxUiLoaderHttpModule.forRoot({
        showForeground: true,
      })
    )
  ]
};





/*
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { AuthInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi() // Esto le dice a HttpClient que use los interceptores declarados con DI
    ),
    LoginService, // Asegúrate de que LoginService esté provisto
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // ¡Sigue siendo clave!
    }
  ]
};
*/
