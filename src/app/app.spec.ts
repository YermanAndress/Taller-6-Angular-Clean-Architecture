import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { NavbarComponent } from './presentation/shared/navbar/navbar.component';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
  });

  it('debe crear el componente raíz', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe renderizar el navbar', () => {
    expect(fixture.debugElement.query(By.directive(NavbarComponent))).toBeTruthy();
  });

  it('debe contener el router-outlet', () => {
    expect(fixture.debugElement.query(By.css('router-outlet'))).toBeTruthy();
  });
});
