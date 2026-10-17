import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../domain/models/order.model';

/**
 * Servicio HTTP de infraestructura para órdenes.
 *
 * @remarks
 * Realiza peticiones GET contra el endpoint `/orders/{count}` del
 * backend indicado. No conoce el dominio de negocio, solo el
 * transporte HTTP.
 */
@Injectable({ providedIn: 'root' })
export class OrderService {
  /** Cliente HTTP de Angular. */
  private readonly http = inject(HttpClient);

  /**
   * Obtiene el listado de órdenes desde el backend.
   *
   * @param baseUrl - URL base del backend (sin barra final).
   * @param count - Cantidad de órdenes a solicitar.
   * @returns Observable que emite el arreglo de {@link Order}.
   */
  getAll(baseUrl: string, count: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${baseUrl}/orders/${count}`);
  }
}
