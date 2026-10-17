import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { GetUserByIdUseCase } from '../../../core/application/usecases/user/get-user-by-id.usecase';
import { USERS } from '../../../testing/fixtures';
import { UsersDetailComponent } from './users-detail.component';

describe('UsersDetailComponent', () => {
  const useCaseMock = { execute: jest.fn() };

  function create(id: string | null, source: unknown): ComponentFixture<UsersDetailComponent> {
    useCaseMock.execute.mockReturnValue(source);
    TestBed.configureTestingModule({
      imports: [UsersDetailComponent],
      providers: [
        provideRouter([]),
        { provide: GetUserByIdUseCase, useValue: useCaseMock },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap(id ? { id } : {}) } },
        },
      ],
    });
    const fixture = TestBed.createComponent(UsersDetailComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('debe mostrar el detalle cuando el usuario existe', () => {
    const fixture = create('1', of(USERS[0]));
    expect(fixture.nativeElement.textContent).toContain(USERS[0].fullName);
    expect(fixture.nativeElement.textContent).toContain(USERS[0].email);
  });

  it('debe advertir cuando el usuario no existe', () => {
    const fixture = create('99', of(undefined));
    expect(fixture.nativeElement.textContent).toContain('no existe');
  });

  it('debe advertir cuando ocurre un error', () => {
    const fixture = create(
      '1',
      throwError(() => new Error('fallo')),
    );
    expect(fixture.nativeElement.querySelector('.alert-warning')).toBeTruthy();
  });

  it('debe usar cadena vacía cuando no hay id en la ruta', () => {
    create(null, of(undefined));
    expect(useCaseMock.execute).toHaveBeenCalledWith('');
  });

  it('debe mostrar el spinner mientras carga', () => {
    const fixture = create('1', new Subject());
    expect(fixture.nativeElement.querySelector('.spinner-border')).toBeTruthy();
  });

  it('debe renderizar el enlace de volver al listado', () => {
    const fixture = create('1', of(USERS[0]));
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/users');
  });
});
