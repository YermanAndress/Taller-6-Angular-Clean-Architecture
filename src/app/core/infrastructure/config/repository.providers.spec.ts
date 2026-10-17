import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
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
import { ACTIVE_BACKEND, BackendType, provideRepositories } from './repository.providers';

describe('repository.providers', () => {
  const cases: Array<{
    backend: BackendType;
    user: unknown;
    product: unknown;
    order: unknown;
  }> = [
    {
      backend: 'local',
      user: UserLocalRepositoryImpl,
      product: ProductLocalRepositoryImpl,
      order: OrderLocalRepositoryImpl,
    },
    {
      backend: 'node',
      user: UserNodeRepositoryImpl,
      product: ProductNodeRepositoryImpl,
      order: OrderNodeRepositoryImpl,
    },
    {
      backend: 'spring',
      user: UserSpringRepositoryImpl,
      product: ProductSpringRepositoryImpl,
      order: OrderSpringRepositoryImpl,
    },
  ];

  it('debe exponer el backend node como activo por defecto', () => {
    expect(ACTIVE_BACKEND).toBe('node');
  });

  it.each(cases)('debe resolver las implementaciones del backend $backend', (testCase) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), ...provideRepositories(testCase.backend)],
    });

    expect(TestBed.inject(UserRepository)).toBeInstanceOf(testCase.user);
    expect(TestBed.inject(ProductRepository)).toBeInstanceOf(testCase.product);
    expect(TestBed.inject(OrderRepository)).toBeInstanceOf(testCase.order);
  });
});
