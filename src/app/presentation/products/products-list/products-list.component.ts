import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetAllProductsUseCase } from '../../../core/application/usecases/product/get-all-products.usecase';
import { Product } from '../../../core/domain/models/product.model';

/**
 * Componente de listado de productos.
 *
 * @remarks
 * Pertenece a la **capa de presentación**. Consume únicamente el
 * caso de uso {@link GetAllProductsUseCase} y gestiona su estado con
 * señales de Angular.
 */
@Component({
  selector: 'app-products-list',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <div class="container my-4">
      <h2 class="mb-3">Productos</h2>

      <div class="mb-3">
        <label class="form-label" for="products-count">Cantidad</label>
        <input
          id="products-count"
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
        <div class="alert alert-danger" role="alert">Error al cargar los productos.</div>
      }

      @if (!loading() && !error()) {
        <table class="table table-striped border">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Categoría</th>
              <th scope="col">Stock</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            @for (product of items(); track product.id) {
              <tr>
                <td>{{ product.name }}</td>
                <td>{{ product.price | currency }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.stock }}</td>
                <td>
                  <a class="btn btn-sm btn-primary" [routerLink]="['/products', product.id]">Ver</a>
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
export class ProductsListComponent implements OnInit {
  /** Caso de uso para obtener el listado de productos. */
  private readonly getAllProducts = inject(GetAllProductsUseCase);

  /** Cantidad de productos solicitada. */
  readonly count = signal(10);

  /** Productos cargados. */
  readonly items = signal<Product[]>([]);

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
    this.getAllProducts.execute(this.count()).subscribe({
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
