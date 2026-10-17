import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  ACTIVE_BACKEND,
  provideRepositories,
} from './core/infrastructure/config/repository.providers';

/**
 * Configuración principal de la aplicación.
 *
 * @remarks
 * Registra los providers globales de la aplicación: manejo de
 * errores del navegador, detección de cambios, enrutamiento,
 * cliente HTTP y los repositorios del backend activo.
 *
 * @see {@link ACTIVE_BACKEND}
 * @see {@link provideRepositories}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ...provideRepositories(ACTIVE_BACKEND),
  ],
};
