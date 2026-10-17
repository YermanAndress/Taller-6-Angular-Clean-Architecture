import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../domain/models/order.model';
import { OrderRepository } from '../../../domain/repositories/order.repository';

/**
 * Caso de uso para obtener el listado de órdenes.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Depende únicamente del
 * contrato {@link OrderRepository} y delega en él la obtención
 * de los datos.
 */
@Injectable({ providedIn: 'root' })
export class GetAllOrdersUseCase {
  /** Repositorio de órdenes inyectado por contrato. */
  private readonly repository = inject(OrderRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param count - Cantidad de órdenes a recuperar.
   * @returns Observable que emite el arreglo de {@link Order}.
   */
  execute(count: number): Observable<Order[]> {
    return this.repository.getAll(count);
  }
}
