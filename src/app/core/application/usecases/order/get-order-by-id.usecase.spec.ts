import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { ORDERS } from '../../../../testing/fixtures';
import { GetOrderByIdUseCase } from './get-order-by-id.usecase';

describe('GetOrderByIdUseCase', () => {
  let useCase: GetOrderByIdUseCase;
  const repositoryMock = { getAll: jest.fn(), getById: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: OrderRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetOrderByIdUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debe delegar en repository.getById con el id indicado', () => {
    repositoryMock.getById.mockReturnValue(of(ORDERS[0]));
    let result: unknown;
    useCase.execute('1').subscribe((value) => (result = value));
    expect(repositoryMock.getById).toHaveBeenCalledWith('1');
    expect(result).toEqual(ORDERS[0]);
  });
});
