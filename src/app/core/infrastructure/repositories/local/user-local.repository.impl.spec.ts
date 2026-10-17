import { TestBed } from '@angular/core/testing';
import { UserLocalRepositoryImpl } from './user-local.repository.impl';

describe('UserLocalRepositoryImpl', () => {
  let repository: UserLocalRepositoryImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserLocalRepositoryImpl] });
    repository = TestBed.inject(UserLocalRepositoryImpl);
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe generar la cantidad de usuarios solicitada', () => {
    repository.getAll(5).subscribe((users) => {
      expect(users.length).toBe(5);
      expect(users[0].fullName).toBeTruthy();
    });
  });

  it('debe resolver getById tras getAll', () => {
    let id = '';
    repository.getAll(3).subscribe((users) => (id = users[0].id));
    let resultId: string | undefined;
    repository.getById(id).subscribe((user) => (resultId = user?.id));
    expect(resultId).toBe(id);
  });

  it('debe devolver undefined en getById para un id desconocido', () => {
    repository.getAll(3).subscribe();
    let result: unknown = {};
    repository.getById('no-existe').subscribe((user) => (result = user));
    expect(result).toBeUndefined();
  });

  it('debe reemplazar la caché en cada getAll', () => {
    let firstId = '';
    repository.getAll(3).subscribe((users) => (firstId = users[0].id));
    repository.getAll(2).subscribe();
    let result: unknown = {};
    repository.getById(firstId).subscribe((user) => (result = user));
    expect(result).toBeUndefined();
  });
});
