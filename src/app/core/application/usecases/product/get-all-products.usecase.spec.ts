import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { PRODUCTS } from '../../../../testing/fixtures';
import { GetAllProductsUseCase } from './get-all-products.usecase';

describe('GetAllProductsUseCase', () => {
  let useCase: GetAllProductsUseCase;
  const repositoryMock = { getAll: jest.fn(), getById: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ProductRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetAllProductsUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debe delegar en repository.getAll con la cantidad indicada', () => {
    repositoryMock.getAll.mockReturnValue(of(PRODUCTS));
    let result: unknown;
    useCase.execute(3).subscribe((value) => (result = value));
    expect(repositoryMock.getAll).toHaveBeenCalledWith(3);
    expect(result).toEqual(PRODUCTS);
  });
});
