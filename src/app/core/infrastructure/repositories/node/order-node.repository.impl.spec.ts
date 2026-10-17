import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ORDERS } from '../../../../testing/fixtures';
import { NODE_API_URL } from '../../config/backend.config';
import { OrderNodeRepositoryImpl } from './order-node.repository.impl';

describe('OrderNodeRepositoryImpl', () => {
  let repository: OrderNodeRepositoryImpl;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://test-node/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        OrderNodeRepositoryImpl,
        { provide: NODE_API_URL, useValue: baseUrl },
      ],
    });
    repository = TestBed.inject(OrderNodeRepositoryImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe llamar a la URL /orders/{count}', () => {
    repository.getAll(2).subscribe((orders) => expect(orders).toEqual(ORDERS));
    const req = httpMock.expectOne(`${baseUrl}/orders/2`);
    expect(req.request.method).toBe('GET');
    req.flush(ORDERS);
  });

  it('debe resolver getById desde la caché tras getAll', () => {
    repository.getAll(2).subscribe();
    httpMock.expectOne(`${baseUrl}/orders/2`).flush(ORDERS);
    let result: unknown;
    repository.getById('1').subscribe((value) => (result = value));
    expect(result).toEqual(ORDERS[0]);
  });

  it('debe devolver undefined en getById para un id desconocido', () => {
    repository.getAll(2).subscribe();
    httpMock.expectOne(`${baseUrl}/orders/2`).flush(ORDERS);
    let result: unknown = ORDERS[0];
    repository.getById('999').subscribe((value) => (result = value));
    expect(result).toBeUndefined();
  });
});
