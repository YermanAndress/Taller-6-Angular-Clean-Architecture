import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';
import { Product } from '../../../domain/models/product.model';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { EntityCache } from '../entity-cache';

/**
 * Implementación local del repositorio de productos.
 *
 * @remarks
 * Genera datos de ejemplo con `@faker-js/faker` y los cachea en
 * memoria mediante {@link EntityCache} para poder resolver
 * `getById` sin backend.
 */
@Injectable()
export class ProductLocalRepositoryImpl extends ProductRepository {
  /** Caché en memoria de la última lista generada. */
  private readonly cache = new EntityCache<Product>();

  /**
   * Genera y devuelve un listado de productos aleatorios.
   *
   * @param count - Cantidad de productos a generar.
   * @returns Observable que emite el arreglo de {@link Product}.
   */
  getAll(count: number): Observable<Product[]> {
    const products: Product[] = Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
      category: faker.commerce.department(),
      stock: faker.number.int({ min: 0, max: 100 }),
    }));
    return of(this.cache.replace(products));
  }

  /**
   * Busca un producto en la última lista generada.
   *
   * @param id - Identificador único del producto.
   * @returns Observable que emite el {@link Product} encontrado o `undefined`.
   */
  getById(id: string): Observable<Product | undefined> {
    return of(this.cache.find(id));
  }
}
