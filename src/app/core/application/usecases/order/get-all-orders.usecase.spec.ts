import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { ORDERS } from '../../../../testing/fixtures';
import { GetAllOrdersUseCase } from './get-all-orders.usecase';

describe('GetAllOrdersUseCase', () => {
  let useCase: GetAllOrdersUseCase;
  const repositoryMock = { getAll: jest.fn(), getById: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: OrderRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetAllOrdersUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debe delegar en repository.getAll con la cantidad indicada', () => {
    repositoryMock.getAll.mockReturnValue(of(ORDERS));
    let result: unknown;
    useCase.execute(7).subscribe((value) => (result = value));
    expect(repositoryMock.getAll).toHaveBeenCalledWith(7);
    expect(result).toEqual(ORDERS);
  });
});
