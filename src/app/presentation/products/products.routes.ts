import { Routes } from '@angular/router';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';

/**
 * Rutas del módulo de productos.
 *
 * @remarks
 * Se cargan de forma perezosa desde {@link routes}.
 */
export const PRODUCTS_ROUTES: Routes = [
  { path: '', component: ProductsListComponent },
  { path: ':id', component: ProductsDetailComponent },
];
