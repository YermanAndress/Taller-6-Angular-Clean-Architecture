import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';

/**
 * Servicio HTTP de infraestructura para productos.
 *
 * @remarks
 * Realiza peticiones GET contra el endpoint `/products/{count}` del
 * backend indicado. No conoce el dominio de negocio, solo el
 * transporte HTTP.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  /** Cliente HTTP de Angular. */
  private readonly http = inject(HttpClient);

  /**
   * Obtiene el listado de productos desde el backend.
   *
   * @param baseUrl - URL base del backend (sin barra final).
   * @param count - Cantidad de productos a solicitar.
   * @returns Observable que emite el arreglo de {@link Product}.
   */
  getAll(baseUrl: string, count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/products/${count}`);
  }
}
