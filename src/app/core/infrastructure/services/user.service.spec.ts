import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { USERS } from '../../../testing/fixtures';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe hacer GET a /users/{count}', () => {
    service.getAll(baseUrl, 5).subscribe((users) => expect(users).toEqual(USERS));
    const req = httpMock.expectOne(`${baseUrl}/users/5`);
    expect(req.request.method).toBe('GET');
    req.flush(USERS);
  });
});
