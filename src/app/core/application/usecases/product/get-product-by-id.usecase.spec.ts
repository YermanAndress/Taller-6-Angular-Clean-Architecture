import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { PRODUCTS } from '../../../../testing/fixtures';
import { GetProductByIdUseCase } from './get-product-by-id.usecase';

describe('GetProductByIdUseCase', () => {
  let useCase: GetProductByIdUseCase;
  const repositoryMock = { getAll: jest.fn(), getById: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ProductRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetProductByIdUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debe delegar en repository.getById con el id indicado', () => {
    repositoryMock.getById.mockReturnValue(of(PRODUCTS[0]));
    let result: unknown;
    useCase.execute('1').subscribe((value) => (result = value));
    expect(repositoryMock.getById).toHaveBeenCalledWith('1');
    expect(result).toEqual(PRODUCTS[0]);
  });
});
