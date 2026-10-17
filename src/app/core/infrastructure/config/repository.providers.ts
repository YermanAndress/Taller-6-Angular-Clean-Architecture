import { Provider } from '@angular/core';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { UserRepository } from '../../domain/repositories/user.repository';
import { OrderLocalRepositoryImpl } from '../repositories/local/order-local.repository.impl';
import { ProductLocalRepositoryImpl } from '../repositories/local/product-local.repository.impl';
import { UserLocalRepositoryImpl } from '../repositories/local/user-local.repository.impl';
import { OrderNodeRepositoryImpl } from '../repositories/node/order-node.repository.impl';
import { ProductNodeRepositoryImpl } from '../repositories/node/product-node.repository.impl';
import { UserNodeRepositoryImpl } from '../repositories/node/user-node.repository.impl';
import { OrderSpringRepositoryImpl } from '../repositories/spring/order-spring.repository.impl';
import { ProductSpringRepositoryImpl } from '../repositories/spring/product-spring.repository.impl';
import { UserSpringRepositoryImpl } from '../repositories/spring/user-spring.repository.impl';

/**
 * Tipos de backend soportados por la aplicación.
 */
export type BackendType = 'local' | 'node' | 'spring';

/**
 * Backend activo de la aplicación.
 *
 * @remarks
 * Cambiar de backend consiste únicamente en modificar esta constante.
 * La capa de presentación y los casos de uso no requieren cambios.
 */
export const ACTIVE_BACKEND: BackendType = 'node';

/**
 * Mapa de proveedores por tipo de backend.
 *
 * @remarks
 * Asocia cada contrato de dominio con la implementación concreta
 * correspondiente al backend seleccionado.
 */
export const REPOSITORY_PROVIDERS: Record<BackendType, Provider[]> = {
  local: [
    { provide: UserRepository, useClass: UserLocalRepositoryImpl },
    { provide: ProductRepository, useClass: ProductLocalRepositoryImpl },
    { provide: OrderRepository, useClass: OrderLocalRepositoryImpl },
  ],
  node: [
    { provide: UserRepository, useClass: UserNodeRepositoryImpl },
    { provide: ProductRepository, useClass: ProductNodeRepositoryImpl },
    { provide: OrderRepository, useClass: OrderNodeRepositoryImpl },
  ],
  spring: [
    { provide: UserRepository, useClass: UserSpringRepositoryImpl },
    { provide: ProductRepository, useClass: ProductSpringRepositoryImpl },
    { provide: OrderRepository, useClass: OrderSpringRepositoryImpl },
  ],
};

/**
 * Devuelve los proveedores de repositorios para el backend indicado.
 *
 * @param backend - Tipo de backend a usar.
 * @returns Arreglo de proveedores que resuelven los contratos de dominio.
 */
export function provideRepositories(backend: BackendType): Provider[] {
  return REPOSITORY_PROVIDERS[backend];
}
