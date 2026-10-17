import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { GetAllOrdersUseCase } from '../../../core/application/usecases/order/get-all-orders.usecase';
import { ORDERS } from '../../../testing/fixtures';
import { OrdersListComponent } from './orders-list.component';

describe('OrdersListComponent', () => {
  let fixture: ComponentFixture<OrdersListComponent>;
  const useCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersListComponent],
      providers: [provideRouter([]), { provide: GetAllOrdersUseCase, useValue: useCaseMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(OrdersListComponent);
  });

  it('debe renderizar una fila por orden', () => {
    useCaseMock.execute.mockReturnValue(of(ORDERS));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(ORDERS.length);
  });

  it('debe generar el href del enlace Ver', () => {
    useCaseMock.execute.mockReturnValue(of(ORDERS));
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a.btn') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(`/orders/${ORDERS[0].id}`);
  });

  it('debe mostrar "Sin resultados" cuando no hay datos', () => {
    useCaseMock.execute.mockReturnValue(of([]));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Sin resultados');
  });

  it('debe mostrar una alerta de error cuando falla la carga', () => {
    useCaseMock.execute.mockReturnValue(throwError(() => new Error('fallo')));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert-danger')).toBeTruthy();
  });

  it('debe mostrar el spinner mientras carga', () => {
    useCaseMock.execute.mockReturnValue(new Subject());
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.spinner-border')).toBeTruthy();
  });

  it('debe recargar con la cantidad ingresada', () => {
    useCaseMock.execute.mockReturnValue(of(ORDERS));
    fixture.detectChanges();
    useCaseMock.execute.mockClear();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '12';
    input.dispatchEvent(new Event('change'));
    expect(useCaseMock.execute).toHaveBeenCalledWith(12);
  });

  it('debe limitar la cantidad máxima a 100', () => {
    useCaseMock.execute.mockReturnValue(of(ORDERS));
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '150';
    input.dispatchEvent(new Event('change'));
    expect(fixture.componentInstance.count()).toBe(100);
  });

  it('debe limitar la cantidad mínima a 1', () => {
    useCaseMock.execute.mockReturnValue(of(ORDERS));
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '-5';
    input.dispatchEvent(new Event('change'));
    expect(fixture.componentInstance.count()).toBe(1);
  });

  it('debe convertir entradas no numéricas en 1 (NaN)', () => {
    useCaseMock.execute.mockReturnValue(of(ORDERS));
    fixture.detectChanges();
    fixture.componentInstance.onCountChange('abc');
    expect(fixture.componentInstance.count()).toBe(1);
    expect(useCaseMock.execute).toHaveBeenCalledWith(1);
  });
});
