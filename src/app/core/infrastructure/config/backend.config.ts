import { InjectionToken } from '@angular/core';

/**
 * Token de inyección con la URL base del backend Node.js.
 *
 * @remarks
 * Se define con `providedIn: 'root'` y una factory por defecto para
 * que la aplicación funcione sin configuración adicional. Puede
 * sobreescribirse fácilmente en pruebas o en despliegues concretos.
 *
 * @example
 * ```ts
 * TestBed.configureTestingModule({
 *   providers: [{ provide: NODE_API_URL, useValue: 'http://localhost:9999/api' }],
 * });
 * ```
 */
export const NODE_API_URL = new InjectionToken<string>('NODE_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000/api',
});

/**
 * Token de inyección con la URL base del backend Spring Boot.
 *
 * @remarks
 * El README del taller expone ambos backends en el puerto `3000`,
 * por lo que el valor por defecto coincide con {@link NODE_API_URL}.
 */
export const SPRING_API_URL = new InjectionToken<string>('SPRING_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000/api',
});
