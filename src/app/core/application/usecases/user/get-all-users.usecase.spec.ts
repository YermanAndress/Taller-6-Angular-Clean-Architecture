import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { USERS } from '../../../../testing/fixtures';
import { GetAllUsersUseCase } from './get-all-users.usecase';

describe('GetAllUsersUseCase', () => {
  let useCase: GetAllUsersUseCase;
  const repositoryMock = { getAll: jest.fn(), getById: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserRepository, useValue: repositoryMock }],
    });
    useCase = TestBed.inject(GetAllUsersUseCase);
  });

  it('debe crearse correctamente', () => {
    expect(useCase).toBeTruthy();
  });

  it('debe delegar en repository.getAll con la cantidad indicada', () => {
    repositoryMock.getAll.mockReturnValue(of(USERS));
    let result: unknown;
    useCase.execute(5).subscribe((value) => (result = value));
    expect(repositoryMock.getAll).toHaveBeenCalledWith(5);
    expect(result).toEqual(USERS);
  });
});
