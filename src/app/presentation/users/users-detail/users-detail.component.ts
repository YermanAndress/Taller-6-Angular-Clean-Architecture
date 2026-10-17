import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetUserByIdUseCase } from '../../../core/application/usecases/user/get-user-by-id.usecase';
import { User } from '../../../core/domain/models/user.model';

/**
 * Componente de detalle de usuario.
 *
 * @remarks
 * Pertenece a la **capa de presentación**. Lee el identificador de
 * la ruta y consume {@link GetUserByIdUseCase} para resolver el detalle.
 */
@Component({
  selector: 'app-users-detail',
  imports: [RouterLink],
  template: `
    <div class="container my-4">
      <h2 class="mb-3">Detalle de usuario</h2>

      @if (!loaded()) {
        <div class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
      }

      @if (loaded() && error()) {
        <div class="alert alert-warning" role="alert">Ocurrió un error al cargar el usuario.</div>
      }

      @if (loaded() && !error() && item(); as user) {
        <div class="card">
          <div class="card-body">
            <dl class="row mb-0">
              <dt class="col-sm-3">Id</dt>
              <dd class="col-sm-9">{{ user.id }}</dd>
              <dt class="col-sm-3">Nombre completo</dt>
              <dd class="col-sm-9">{{ user.fullName }}</dd>
              <dt class="col-sm-3">Email</dt>
              <dd class="col-sm-9">{{ user.email }}</dd>
              <dt class="col-sm-3">Teléfono</dt>
              <dd class="col-sm-9">{{ user.phone }}</dd>
              <dt class="col-sm-3">Ciudad</dt>
              <dd class="col-sm-9">{{ user.city }}</dd>
            </dl>
          </div>
        </div>
      }

      @if (loaded() && !error() && !item()) {
        <div class="alert alert-warning" role="alert">El usuario no existe.</div>
      }

      <a class="btn btn-link mt-3 px-0" routerLink="/users">Volver al listado</a>
    </div>
  `,
})
export class UsersDetailComponent implements OnInit {
  /** Ruta activa, usada para leer el parámetro `id`. */
  private readonly route = inject(ActivatedRoute);

  /** Caso de uso para obtener un usuario por id. */
  private readonly getUserById = inject(GetUserByIdUseCase);

  /** Usuario encontrado, si existe. */
  readonly item = signal<User | undefined>(undefined);

  /** Indica si el detalle terminó de cargar. */
  readonly loaded = signal(false);

  /** Indica si ocurrió un error durante la carga. */
  readonly error = signal(false);

  /** Identificador leído de la ruta. */
  readonly id = this.route.snapshot.paramMap.get('id') ?? '';

  /** Carga el detalle al inicializar el componente. */
  ngOnInit(): void {
    this.getUserById.execute(this.id).subscribe({
      next: (item) => {
        this.item.set(item);
        this.loaded.set(true);
      },
      error: () => {
        this.error.set(true);
        this.loaded.set(true);
      },
    });
  }
}
