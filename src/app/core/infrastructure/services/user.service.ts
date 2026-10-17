import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';

/**
 * Servicio HTTP de infraestructura para usuarios.
 *
 * @remarks
 * Realiza peticiones GET contra el endpoint `/users/{count}` del
 * backend indicado. No conoce el dominio de negocio, solo el
 * transporte HTTP.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  /** Cliente HTTP de Angular. */
  private readonly http = inject(HttpClient);

  /**
   * Obtiene el listado de usuarios desde el backend.
   *
   * @param baseUrl - URL base del backend (sin barra final).
   * @param count - Cantidad de usuarios a solicitar.
   * @returns Observable que emite el arreglo de {@link User}.
   */
  getAll(baseUrl: string, count: number): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users/${count}`);
  }
}
