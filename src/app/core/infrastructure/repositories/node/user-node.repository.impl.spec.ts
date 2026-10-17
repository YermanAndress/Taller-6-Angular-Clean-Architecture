import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { USERS } from '../../../../testing/fixtures';
import { NODE_API_URL } from '../../config/backend.config';
import { UserNodeRepositoryImpl } from './user-node.repository.impl';

describe('UserNodeRepositoryImpl', () => {
  let repository: UserNodeRepositoryImpl;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://test-node/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UserNodeRepositoryImpl,
        { provide: NODE_API_URL, useValue: baseUrl },
      ],
    });
    repository = TestBed.inject(UserNodeRepositoryImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe llamar a la URL /users/{count}', () => {
    repository.getAll(2).subscribe((users) => expect(users).toEqual(USERS));
    const req = httpMock.expectOne(`${baseUrl}/users/2`);
    expect(req.request.method).toBe('GET');
    req.flush(USERS);
  });

  it('debe resolver getById desde la caché tras getAll', () => {
    repository.getAll(2).subscribe();
    httpMock.expectOne(`${baseUrl}/users/2`).flush(USERS);
    let result: unknown;
    repository.getById('1').subscribe((value) => (result = value));
    expect(result).toEqual(USERS[0]);
  });

  it('debe devolver undefined en getById para un id desconocido', () => {
    repository.getAll(2).subscribe();
    httpMock.expectOne(`${baseUrl}/users/2`).flush(USERS);
    let result: unknown = USERS[0];
    repository.getById('999').subscribe((value) => (result = value));
    expect(result).toBeUndefined();
  });
});
