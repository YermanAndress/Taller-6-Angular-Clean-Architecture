import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Order } from '../../../domain/models/order.model';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { SPRING_API_URL } from '../../config/backend.config';
import { OrderService } from '../../services/order.service';
import { EntityCache } from '../entity-cache';

/**
 * Implementación del repositorio de órdenes para el backend Spring Boot.
 *
 * @remarks
 * Consume {@link OrderService} usando la URL {@link SPRING_API_URL} y
 * guarda la última lista en {@link EntityCache} para resolver
 * `getById`.
 *
 * Si el contrato del backend difiere del modelo de dominio, el
 * mapeo DTO -> dominio debe realizarse aquí, justo antes de
 * guardar en la caché.
 */
@Injectable()
export class OrderSpringRepositoryImpl extends OrderRepository {
  /** Servicio HTTP de órdenes. */
  private readonly service = inject(OrderService);

  /** URL base del backend Spring Boot. */
  private readonly baseUrl = inject(SPRING_API_URL);

  /** Caché en memoria de la última lista obtenida. */
  private readonly cache = new EntityCache<Order>();

  /**
   * Obtiene órdenes desde el backend Spring Boot.
   *
   * @param count - Cantidad de órdenes a solicitar.
   * @returns Observable que emite el arreglo de {@link Order}.
   */
  getAll(count: number): Observable<Order[]> {
    // Aquí se mapearía el DTO a Order si el contrato del backend difiere.
    return this.service.getAll(this.baseUrl, count).pipe(map((items) => this.cache.replace(items)));
  }

  /**
   * Busca una orden en la última lista cargada.
   *
   * @param id - Identificador único de la orden.
   * @returns Observable que emite la {@link Order} encontrada o `undefined`.
   */
  getById(id: string): Observable<Order | undefined> {
    return of(this.cache.find(id));
  }
}
