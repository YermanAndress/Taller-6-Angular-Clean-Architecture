import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PRODUCTS } from '../../../testing/fixtures';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe hacer GET a /products/{count}', () => {
    service.getAll(baseUrl, 4).subscribe((products) => expect(products).toEqual(PRODUCTS));
    const req = httpMock.expectOne(`${baseUrl}/products/4`);
    expect(req.request.method).toBe('GET');
    req.flush(PRODUCTS);
  });
});
