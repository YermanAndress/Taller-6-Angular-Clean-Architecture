import { TestBed } from '@angular/core/testing';
import { OrderLocalRepositoryImpl } from './order-local.repository.impl';

describe('OrderLocalRepositoryImpl', () => {
  let repository: OrderLocalRepositoryImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [OrderLocalRepositoryImpl] });
    repository = TestBed.inject(OrderLocalRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe generar la cantidad de órdenes solicitada', () => {
    repository.getAll(6).subscribe((orders) => {
      expect(orders.length).toBe(6);
      expect(orders[0].customer).toBeTruthy();
      expect(orders[0].total).toBeGreaterThan(0);
    });
  });

  it('debe resolver getById tras getAll', () => {
    let id = '';
    repository.getAll(3).subscribe((orders) => (id = orders[0].id));
    let resultId: string | undefined;
    repository.getById(id).subscribe((order) => (resultId = order?.id));
    expect(resultId).toBe(id);
  });

  it('debe devolver undefined en getById para un id desconocido', () => {
    repository.getAll(3).subscribe();
    let result: unknown = {};
    repository.getById('no-existe').subscribe((order) => (result = order));
    expect(result).toBeUndefined();
  });

  it('debe reemplazar la caché en cada getAll', () => {
    let firstId = '';
    repository.getAll(3).subscribe((orders) => (firstId = orders[0].id));
    repository.getAll(2).subscribe();
    let result: unknown = {};
    repository.getById(firstId).subscribe((order) => (result = order));
    expect(result).toBeUndefined();
  });
});
