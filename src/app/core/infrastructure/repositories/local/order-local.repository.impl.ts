import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';
import { ORDER_STATUSES, Order } from '../../../domain/models/order.model';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { EntityCache } from '../entity-cache';

/**
 * Implementación local del repositorio de órdenes.
 *
 * @remarks
 * Genera datos de ejemplo con `@faker-js/faker` y los cachea en
 * memoria mediante {@link EntityCache} para poder resolver
 * `getById` sin backend.
 */
@Injectable()
export class OrderLocalRepositoryImpl extends OrderRepository {
  /** Caché en memoria de la última lista generada. */
  private readonly cache = new EntityCache<Order>();

  /**
   * Genera y devuelve un listado de órdenes aleatorias.
   *
   * @param count - Cantidad de órdenes a generar.
   * @returns Observable que emite el arreglo de {@link Order}.
   */
  getAll(count: number): Observable<Order[]> {
    const orders: Order[] = Array.from({ length: count }, () => {
      const quantity = faker.number.int({ min: 1, max: 10 });
      const unitPrice = faker.number.float({ min: 1, max: 1000, fractionDigits: 2 });
      return {
        id: faker.string.uuid(),
        customer: faker.person.fullName(),
        product: faker.commerce.productName(),
        quantity,
        total: Number((unitPrice * quantity).toFixed(2)),
        status: faker.helpers.arrayElement(ORDER_STATUSES),
        createdAt: faker.date.recent().toISOString(),
      };
    });
    return of(this.cache.replace(orders));
  }

  /**
   * Busca una orden en la última lista generada.
   *
   * @param id - Identificador único de la orden.
   * @returns Observable que emite la {@link Order} encontrada o `undefined`.
   */
  getById(id: string): Observable<Order | undefined> {
    return of(this.cache.find(id));
  }
}
