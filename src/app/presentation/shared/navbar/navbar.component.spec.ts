import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe renderizar los enlaces de los tres módulos', () => {
    const anchors = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];
    const hrefs = anchors.map((anchor) => anchor.getAttribute('href'));
    expect(hrefs).toEqual(expect.arrayContaining(['/users', '/products', '/orders']));
  });

  it('debe mostrar el backend activo en la insignia', () => {
    expect(fixture.nativeElement.textContent).toContain('Backend: node');
  });
});
