import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

/**
 * Contrato del repositorio de productos.
 *
 * @remarks
 * Clase abstracta que actúa como **token de inyección** dentro de
 * la **capa de dominio**. Define las operaciones que toda
 * implementación (local, Node o Spring) debe cumplir, sin exponer
 * detalles de infraestructura.
 *
 * @example
 * ```ts
 * constructor(private readonly repository: ProductRepository) {}
 * ```
 */
export abstract class ProductRepository {
  /**
   * Obtiene un listado de productos.
   *
   * @param count - Cantidad de productos a recuperar.
   * @returns Observable que emite el arreglo de {@link Product}.
   */
  abstract getAll(count: number): Observable<Product[]>;

  /**
   * Obtiene un producto por su identificador.
   *
   * @param id - Identificador único del producto.
   * @returns Observable que emite el {@link Product} encontrado o `undefined`.
   */
  abstract getById(id: string): Observable<Product | undefined>;
}
