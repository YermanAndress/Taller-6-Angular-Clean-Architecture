import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

/**
 * Contrato del repositorio de órdenes.
 *
 * @remarks
 * Clase abstracta que actúa como **token de inyección** dentro de
 * la **capa de dominio**. Define las operaciones que toda
 * implementación (local, Node o Spring) debe cumplir, sin exponer
 * detalles de infraestructura.
 *
 * @example
 * ```ts
 * constructor(private readonly repository: OrderRepository) {}
 * ```
 */
export abstract class OrderRepository {
  /**
   * Obtiene un listado de órdenes.
   *
   * @param count - Cantidad de órdenes a recuperar.
   * @returns Observable que emite el arreglo de {@link Order}.
   */
  abstract getAll(count: number): Observable<Order[]>;

  /**
   * Obtiene una orden por su identificador.
   *
   * @param id - Identificador único de la orden.
   * @returns Observable que emite la {@link Order} encontrada o `undefined`.
   */
  abstract getById(id: string): Observable<Order | undefined>;
}
