import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Product } from '../../../domain/models/product.model';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { SPRING_API_URL } from '../../config/backend.config';
import { ProductService } from '../../services/product.service';
import { EntityCache } from '../entity-cache';

/**
 * Implementación del repositorio de productos para el backend Spring Boot.
 *
 * @remarks
 * Consume {@link ProductService} usando la URL {@link SPRING_API_URL} y
 * guarda la última lista en {@link EntityCache} para resolver
 * `getById`.
 *
 * Si el contrato del backend difiere del modelo de dominio, el
 * mapeo DTO -> dominio debe realizarse aquí, justo antes de
 * guardar en la caché.
 */
@Injectable()
export class ProductSpringRepositoryImpl extends ProductRepository {
  /** Servicio HTTP de productos. */
  private readonly service = inject(ProductService);

  /** URL base del backend Spring Boot. */
  private readonly baseUrl = inject(SPRING_API_URL);

  /** Caché en memoria de la última lista obtenida. */
  private readonly cache = new EntityCache<Product>();

  /**
   * Obtiene productos desde el backend Spring Boot.
   *
   * @param count - Cantidad de productos a solicitar.
   * @returns Observable que emite el arreglo de {@link Product}.
   */
  getAll(count: number): Observable<Product[]> {
    // Aquí se mapearía el DTO a Product si el contrato del backend difiere.
    return this.service.getAll(this.baseUrl, count).pipe(map((items) => this.cache.replace(items)));
  }

  /**
   * Busca un producto en la última lista cargada.
   *
   * @param id - Identificador único del producto.
   * @returns Observable que emite el {@link Product} encontrado o `undefined`.
   */
  getById(id: string): Observable<Product | undefined> {
    return of(this.cache.find(id));
  }
}
