import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ORDERS } from '../../../testing/fixtures';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe hacer GET a /orders/{count}', () => {
    service.getAll(baseUrl, 6).subscribe((orders) => expect(orders).toEqual(ORDERS));
    const req = httpMock.expectOne(`${baseUrl}/orders/6`);
    expect(req.request.method).toBe('GET');
    req.flush(ORDERS);
  });
});
