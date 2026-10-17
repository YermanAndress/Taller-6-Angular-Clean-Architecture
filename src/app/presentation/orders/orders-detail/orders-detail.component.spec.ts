import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { GetOrderByIdUseCase } from '../../../core/application/usecases/order/get-order-by-id.usecase';
import { ORDERS } from '../../../testing/fixtures';
import { OrdersDetailComponent } from './orders-detail.component';

describe('OrdersDetailComponent', () => {
  const useCaseMock = { execute: jest.fn() };

  function create(id: string | null, source: unknown): ComponentFixture<OrdersDetailComponent> {
    useCaseMock.execute.mockReturnValue(source);
    TestBed.configureTestingModule({
      imports: [OrdersDetailComponent],
      providers: [
        provideRouter([]),
        { provide: GetOrderByIdUseCase, useValue: useCaseMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap(id ? { id } : {}) } },
        },
      ],
    });
    const fixture = TestBed.createComponent(OrdersDetailComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('debe mostrar el detalle cuando la orden existe', () => {
    const fixture = create('1', of(ORDERS[0]));
    expect(fixture.nativeElement.textContent).toContain(ORDERS[0].customer);
    expect(fixture.nativeElement.textContent).toContain(ORDERS[0].product);
  });

  it('debe advertir cuando la orden no existe', () => {
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
    const fixture = create('1', of(ORDERS[0]));
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/orders');
  });
});
