import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../domain/models/product.model';
import { ProductRepository } from '../../../domain/repositories/product.repository';

/**
 * Caso de uso para obtener un producto por su identificador.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Depende únicamente del
 * contrato {@link ProductRepository} y delega en él la búsqueda.
 */
@Injectable({ providedIn: 'root' })
export class GetProductByIdUseCase {
  /** Repositorio de productos inyectado por contrato. */
  private readonly repository = inject(ProductRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id - Identificador único del producto.
   * @returns Observable que emite el {@link Product} encontrado o `undefined`.
   */
  execute(id: string): Observable<Product | undefined> {
    return this.repository.getById(id);
  }
}
