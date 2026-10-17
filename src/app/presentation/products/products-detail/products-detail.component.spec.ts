import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { GetProductByIdUseCase } from '../../../core/application/usecases/product/get-product-by-id.usecase';
import { PRODUCTS } from '../../../testing/fixtures';
import { ProductsDetailComponent } from './products-detail.component';

describe('ProductsDetailComponent', () => {
  const useCaseMock = { execute: jest.fn() };

  function create(id: string | null, source: unknown): ComponentFixture<ProductsDetailComponent> {
    useCaseMock.execute.mockReturnValue(source);
    TestBed.configureTestingModule({
      imports: [ProductsDetailComponent],
      providers: [
        provideRouter([]),
        { provide: GetProductByIdUseCase, useValue: useCaseMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap(id ? { id } : {}) } },
        },
      ],
    });
    const fixture = TestBed.createComponent(ProductsDetailComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('debe mostrar el detalle cuando el producto existe', () => {
    const fixture = create('1', of(PRODUCTS[0]));
    expect(fixture.nativeElement.textContent).toContain(PRODUCTS[0].name);
    expect(fixture.nativeElement.textContent).toContain(PRODUCTS[0].description);
  });

  it('debe advertir cuando el producto no existe', () => {
    const fixture = create('99', of(undefined));
    expect(fixture.nativeElement.textContent).toContain('no existe');
  });

  it('debe advertir cuando ocurre un error', () => {
    const fixture = create(
      '1',
      throwError(() => new Error('fallo')),
    );
    expect(fixture.nativeElement.querySelector('.alert-warning')).toBeTruthy();
  });

  it('debe usar cadena vacía cuando no hay id en la ruta', () => {
    create(null, of(undefined));
    expect(useCaseMock.execute).toHaveBeenCalledWith('');
  });

  it('debe mostrar el spinner mientras carga', () => {
    const fixture = create('1', new Subject());
    expect(fixture.nativeElement.querySelector('.spinner-border')).toBeTruthy();
  });

  it('debe renderizar el enlace de volver al listado', () => {
    const fixture = create('1', of(PRODUCTS[0]));
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/products');
  });
});
