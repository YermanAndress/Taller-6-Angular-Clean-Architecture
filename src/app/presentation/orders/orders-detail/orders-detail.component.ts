import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetOrderByIdUseCase } from '../../../core/application/usecases/order/get-order-by-id.usecase';
import { Order } from '../../../core/domain/models/order.model';

/**
 * Componente de detalle de orden.
 *
 * @remarks
 * Pertenece a la **capa de presentación**. Lee el identificador de
 * la ruta y consume {@link GetOrderByIdUseCase} para resolver el detalle.
 */
@Component({
  selector: 'app-orders-detail',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  template: `
    <div class="container my-4">
      <h2 class="mb-3">Detalle de orden</h2>

      @if (!loaded()) {
        <div class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
      }

      @if (loaded() && error()) {
        <div class="alert alert-warning" role="alert">Ocurrió un error al cargar la orden.</div>
      }

      @if (loaded() && !error() && item(); as order) {
        <div class="card">
          <div class="card-body">
            <dl class="row mb-0">
              <dt class="col-sm-3">Id</dt>
              <dd class="col-sm-9">{{ order.id }}</dd>
              <dt class="col-sm-3">Cliente</dt>
              <dd class="col-sm-9">{{ order.customer }}</dd>
              <dt class="col-sm-3">Producto</dt>
              <dd class="col-sm-9">{{ order.product }}</dd>
              <dt class="col-sm-3">Cantidad</dt>
              <dd class="col-sm-9">{{ order.quantity }}</dd>
              <dt class="col-sm-3">Total</dt>
              <dd class="col-sm-9">{{ order.total | currency }}</dd>
              <dt class="col-sm-3">Estado</dt>
              <dd class="col-sm-9">{{ order.status }}</dd>
              <dt class="col-sm-3">Fecha</dt>
              <dd class="col-sm-9">{{ order.createdAt | date: 'medium' }}</dd>
            </dl>
          </div>
        </div>
      }

      @if (loaded() && !error() && !item()) {
        <div class="alert alert-warning" role="alert">La orden no existe.</div>
      }

      <a class="btn btn-link mt-3 px-0" routerLink="/orders">Volver al listado</a>
    </div>
  `,
})
export class OrdersDetailComponent implements OnInit {
  /** Ruta activa, usada para leer el parámetro `id`. */
  private readonly route = inject(ActivatedRoute);

  /** Caso de uso para obtener una orden por id. */
  private readonly getOrderById = inject(GetOrderByIdUseCase);

  /** Orden encontrada, si existe. */
  readonly item = signal<Order | undefined>(undefined);

  /** Indica si el detalle terminó de cargar. */
  readonly loaded = signal(false);

  /** Indica si ocurrió un error durante la carga. */
  readonly error = signal(false);

  /** Identificador leído de la ruta. */
  readonly id = this.route.snapshot.paramMap.get('id') ?? '';

  /** Carga el detalle al inicializar el componente. */
  ngOnInit(): void {
    this.getOrderById.execute(this.id).subscribe({
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
