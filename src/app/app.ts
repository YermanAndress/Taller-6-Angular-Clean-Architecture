import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './presentation/shared/navbar/navbar.component';

/**
 * Componente raíz de la aplicación.
 *
 * @remarks
 * Define el layout general: una barra de navegación y el
 * `router-outlet` donde se renderizan los módulos cargados de
 * forma perezosa.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main class="container my-4">
      <router-outlet />
    </main>
  `,
})
export class App {}
