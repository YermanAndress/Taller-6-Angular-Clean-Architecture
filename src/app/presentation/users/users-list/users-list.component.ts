import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetAllUsersUseCase } from '../../../core/application/usecases/user/get-all-users.usecase';
import { User } from '../../../core/domain/models/user.model';

/**
 * Componente de listado de usuarios.
 *
 * @remarks
 * Pertenece a la **capa de presentación**. Consume únicamente el
 * caso de uso {@link GetAllUsersUseCase} y gestiona su estado con
 * señales de Angular.
 */
@Component({
  selector: 'app-users-list',
  imports: [RouterLink],
  template: `
    <div class="container my-4">
      <h2 class="mb-3">Usuarios</h2>

      <div class="mb-3">
        <label class="form-label" for="users-count">Cantidad</label>
        <input
          id="users-count"
          type="number"
          class="form-control"
          style="max-width: 160px"
          min="1"
          max="100"
          [value]="count()"
          (change)="onCountChange($any($event.target).value)"
        />
      </div>

      @if (loading()) {
        <div class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
      }

      @if (error()) {
        <div class="alert alert-danger" role="alert">Error al cargar los usuarios.</div>
      }

      @if (!loading() && !error()) {
        <table class="table table-striped border">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Ciudad</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            @for (user of items(); track user.id) {
              <tr>
                <td>{{ user.fullName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.city }}</td>
                <td>
                  <a class="btn btn-sm btn-primary" [routerLink]="['/users', user.id]">Ver</a>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="text-center">Sin resultados</td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
})
export class UsersListComponent implements OnInit {
  /** Caso de uso para obtener el listado de usuarios. */
  private readonly getAllUsers = inject(GetAllUsersUseCase);

  /** Cantidad de usuarios solicitada. */
  readonly count = signal(10);

  /** Usuarios cargados. */
  readonly items = signal<User[]>([]);

  /** Indica si hay una carga en curso. */
  readonly loading = signal(false);

  /** Indica si ocurrió un error en la última carga. */
  readonly error = signal(false);

  /** Carga el listado al inicializar el componente. */
  ngOnInit(): void {
    this.load();
  }

  /**
   * Ejecuta el caso de uso y actualiza el estado del componente.
   */
  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.getAllUsers.execute(this.count()).subscribe({
      next: (items) => {
        this.items.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  /**
   * Normaliza la cantidad recibida y recarga el listado.
   *
   * @param value - Valor crudo del input.
   * @remarks
   * Convierte valores no numéricos a `1` y limita el rango a `[1, 100]`.
   */
  onCountChange(value: string): void {
    const parsed = Number(value);
    const safe = Number.isNaN(parsed) ? 1 : Math.trunc(parsed);
    this.count.set(Math.min(100, Math.max(1, safe)));
    this.load();
  }
}
