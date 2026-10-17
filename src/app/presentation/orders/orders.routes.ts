import { Routes } from '@angular/router';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

/**
 * Rutas del módulo de órdenes.
 *
 * @remarks
 * Se cargan de forma perezosa desde {@link routes}.
 */
export const ORDERS_ROUTES: Routes = [
  { path: '', component: OrdersListComponent },
  { path: ':id', component: OrdersDetailComponent },
];
