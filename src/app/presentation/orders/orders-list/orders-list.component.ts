import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetAllOrdersUseCase } from '../../../core/application/usecases/order/get-all-orders.usecase';
import { Order } from '../../../core/domain/models/order.model';

/**
 * Componente de listado de órdenes.
 *
 * @remarks
 * Pertenece a la **capa de presentación**. Consume únicamente el
 * caso de uso {@link GetAllOrdersUseCase} y gestiona su estado con
 * señales de Angular.
 */
@Component({
  selector: 'app-orders-list',
  imports: [RouterLink, CurrencyPipe, DatePipe],
  template: `
    <div class="container my-4">
      <h2 class="mb-3">Órdenes</h2>

      <div class="mb-3">
        <label class="form-label" for="orders-count">Cantidad</label>
        <input
          id="orders-count"
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
        <div class="alert alert-danger" role="alert">Error al cargar las órdenes.</div>
      }

      @if (!loading() && !error()) {
        <table class="table table-striped border">
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Producto</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Total</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            @for (order of items(); track order.id) {
              <tr>
                <td>{{ order.customer }}</td>
                <td>{{ order.product }}</td>
                <td>{{ order.quantity }}</td>
                <td>{{ order.total | currency }}</td>
                <td>{{ order.status }}</td>
                <td>{{ order.createdAt | date: 'short' }}</td>
                <td>
                  <a class="btn btn-sm btn-primary" [routerLink]="['/orders', order.id]">Ver</a>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="7" class="text-center">Sin resultados</td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
})
export class OrdersListComponent implements OnInit {
  /** Caso de uso para obtener el listado de órdenes. */
  private readonly getAllOrders = inject(GetAllOrdersUseCase);

  /** Cantidad de órdenes solicitada. */
  readonly count = signal(10);

  /** Órdenes cargadas. */
  readonly items = signal<Order[]>([]);

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
    this.getAllOrders.execute(this.count()).subscribe({
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
