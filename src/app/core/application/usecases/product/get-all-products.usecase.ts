import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../domain/models/product.model';
import { ProductRepository } from '../../../domain/repositories/product.repository';

/**
 * Caso de uso para obtener el listado de productos.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Depende únicamente del
 * contrato {@link ProductRepository} y delega en él la obtención
 * de los datos.
 */
@Injectable({ providedIn: 'root' })
export class GetAllProductsUseCase {
  /** Repositorio de productos inyectado por contrato. */
  private readonly repository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param count - Cantidad de productos a recuperar.
   * @returns Observable que emite el arreglo de {@link Product}.
   */
  execute(count: number): Observable<Product[]> {
    return this.repository.getAll(count);
  }
}
