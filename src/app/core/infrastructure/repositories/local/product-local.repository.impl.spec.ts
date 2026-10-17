import { TestBed } from '@angular/core/testing';
import { ProductLocalRepositoryImpl } from './product-local.repository.impl';

describe('ProductLocalRepositoryImpl', () => {
  let repository: ProductLocalRepositoryImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ProductLocalRepositoryImpl] });
    repository = TestBed.inject(ProductLocalRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe generar la cantidad de productos solicitada', () => {
    repository.getAll(4).subscribe((products) => {
      expect(products.length).toBe(4);
      expect(products[0].name).toBeTruthy();
    });
  });

  it('debe resolver getById tras getAll', () => {
    let id = '';
    repository.getAll(3).subscribe((products) => (id = products[0].id));
    let resultId: string | undefined;
    repository.getById(id).subscribe((product) => (resultId = product?.id));
    expect(resultId).toBe(id);
  });

  it('debe devolver undefined en getById para un id desconocido', () => {
    repository.getAll(3).subscribe();
    let result: unknown = {};
    repository.getById('no-existe').subscribe((product) => (result = product));
    expect(result).toBeUndefined();
  });

  it('debe reemplazar la caché en cada getAll', () => {
    let firstId = '';
    repository.getAll(3).subscribe((products) => (firstId = products[0].id));
    repository.getAll(2).subscribe();
    let result: unknown = {};
    repository.getById(firstId).subscribe((product) => (result = product));
    expect(result).toBeUndefined();
  });
});
