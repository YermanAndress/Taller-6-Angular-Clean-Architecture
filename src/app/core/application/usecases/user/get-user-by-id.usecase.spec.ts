import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { USERS } from '../../../../testing/fixtures';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';

describe('GetUserByIdUseCase', () => {
  let useCase: GetUserByIdUseCase;
  const repositoryMock = { getAll: jest.fn(), getById: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetUserByIdUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debe delegar en repository.getById con el id indicado', () => {
    repositoryMock.getById.mockReturnValue(of(USERS[0]));
    let result: unknown;
    useCase.execute('1').subscribe((value) => (result = value));
    expect(repositoryMock.getById).toHaveBeenCalledWith('1');
    expect(result).toEqual(USERS[0]);
  });
});
