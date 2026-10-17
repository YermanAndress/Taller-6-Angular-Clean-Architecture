import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { USERS } from '../../../../testing/fixtures';
import { SPRING_API_URL } from '../../config/backend.config';
import { UserSpringRepositoryImpl } from './user-spring.repository.impl';

describe('UserSpringRepositoryImpl', () => {
  let repository: UserSpringRepositoryImpl;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://test-spring/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UserSpringRepositoryImpl,
        { provide: SPRING_API_URL, useValue: baseUrl },
      ],
    });
    repository = TestBed.inject(UserSpringRepositoryImpl);
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
