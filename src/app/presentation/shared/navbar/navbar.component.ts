import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ACTIVE_BACKEND } from '../../../core/infrastructure/config/repository.providers';

/**
 * Barra de navegación principal de la aplicación.
 *
 * @remarks
 * Componente de presentación que expone los enlaces a los módulos
 * de usuarios, productos y órdenes, resaltando la ruta activa y
 * mostrando el backend configurado.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/users">Angular Client</a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" routerLink="/users" routerLinkActive="active">Usuarios</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/products" routerLinkActive="active">Productos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/orders" routerLinkActive="active">Órdenes</a>
          </li>
        </ul>
        <span class="badge text-bg-info">Backend: {{ backend }}</span>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  /** Backend activo, mostrado como insignia informativa. */
  readonly backend = ACTIVE_BACKEND;
}
