import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PRODUCTS } from '../../../../testing/fixtures';
import { NODE_API_URL } from '../../config/backend.config';
import { ProductNodeRepositoryImpl } from './product-node.repository.impl';

describe('ProductNodeRepositoryImpl', () => {
  let repository: ProductNodeRepositoryImpl;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://test-node/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductNodeRepositoryImpl,
        { provide: NODE_API_URL, useValue: baseUrl },
      ],
    });
    repository = TestBed.inject(ProductNodeRepositoryImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe llamar a la URL /products/{count}', () => {
    repository.getAll(2).subscribe((products) => expect(products).toEqual(PRODUCTS));
    const req = httpMock.expectOne(`${baseUrl}/products/2`);
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS);
  });

  it('debe resolver getById desde la caché tras getAll', () => {
    repository.getAll(2).subscribe();
    httpMock.expectOne(`${baseUrl}/products/2`).flush(PRODUCTS);
    let result: unknown;
    repository.getById('1').subscribe((value) => (result = value));
    expect(result).toEqual(PRODUCTS[0]);
  });

  it('debe devolver undefined en getById para un id desconocido', () => {
    repository.getAll(2).subscribe();
    httpMock.expectOne(`${baseUrl}/products/2`).flush(PRODUCTS);
    let result: unknown = PRODUCTS[0];
    repository.getById('999').subscribe((value) => (result = value));
    expect(result).toBeUndefined();
  });
});
