import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../domain/models/order.model';
import { OrderRepository } from '../../../domain/repositories/order.repository';

/**
 * Caso de uso para obtener una orden por su identificador.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Depende únicamente del
 * contrato {@link OrderRepository} y delega en él la búsqueda.
 */
@Injectable({ providedIn: 'root' })
export class GetOrderByIdUseCase {
  /** Repositorio de órdenes inyectado por contrato. */
  private readonly repository = inject(OrderRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id - Identificador único de la orden.
   * @returns Observable que emite la {@link Order} encontrada o `undefined`.
   */
  execute(id: string): Observable<Order | undefined> {
    return this.repository.getById(id);
  }
}
