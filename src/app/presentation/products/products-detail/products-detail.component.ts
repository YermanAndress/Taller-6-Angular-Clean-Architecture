import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetProductByIdUseCase } from '../../../core/application/usecases/product/get-product-by-id.usecase';
import { Product } from '../../../core/domain/models/product.model';

/**
 * Componente de detalle de producto.
 *
 * @remarks
 * Pertenece a la **capa de presentación**. Lee el identificador de
 * la ruta y consume {@link GetProductByIdUseCase} para resolver el detalle.
 */
@Component({
  selector: 'app-products-detail',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <div class="container my-4">
      <h2 class="mb-3">Detalle de producto</h2>

      @if (!loaded()) {
        <div class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>
      }

      @if (loaded() && error()) {
        <div class="alert alert-warning" role="alert">Ocurrió un error al cargar el producto.</div>
      }

      @if (loaded() && !error() && item(); as product) {
        <div class="card">
          <div class="card-body">
            <dl class="row mb-0">
              <dt class="col-sm-3">Id</dt>
              <dd class="col-sm-9">{{ product.id }}</dd>
              <dt class="col-sm-3">Nombre</dt>
              <dd class="col-sm-9">{{ product.name }}</dd>
              <dt class="col-sm-3">Descripción</dt>
              <dd class="col-sm-9">{{ product.description }}</dd>
              <dt class="col-sm-3">Precio</dt>
              <dd class="col-sm-9">{{ product.price | currency }}</dd>
              <dt class="col-sm-3">Categoría</dt>
              <dd class="col-sm-9">{{ product.category }}</dd>
              <dt class="col-sm-3">Stock</dt>
              <dd class="col-sm-9">{{ product.stock }}</dd>
            </dl>
          </div>
        </div>
      }

      @if (loaded() && !error() && !item()) {
        <div class="alert alert-warning" role="alert">El producto no existe.</div>
      }

      <a class="btn btn-link mt-3 px-0" routerLink="/products">Volver al listado</a>
    </div>
  `,
})
export class ProductsDetailComponent implements OnInit {
  /** Ruta activa, usada para leer el parámetro `id`. */
  private readonly route = inject(ActivatedRoute);

  /** Caso de uso para obtener un producto por id. */
  private readonly getProductById = inject(GetProductByIdUseCase);

  /** Producto encontrado, si existe. */
  readonly item = signal<Product | undefined>(undefined);

  /** Indica si el detalle terminó de cargar. */
  readonly loaded = signal(false);

  /** Indica si ocurrió un error durante la carga. */
  readonly error = signal(false);

  /** Identificador leído de la ruta. */
  readonly id = this.route.snapshot.paramMap.get('id') ?? '';

  /** Carga el detalle al inicializar el componente. */
  ngOnInit(): void {
    this.getProductById.execute(this.id).subscribe({
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
