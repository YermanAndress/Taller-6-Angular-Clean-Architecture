import { Routes } from '@angular/router';

/**
 * Rutas principales de la aplicación.
 *
 * @remarks
 * Cada módulo se carga de forma perezosa (lazy) mediante
 * `loadChildren`. La ruta vacía y la ruta comodín redirigen a
 * `users`.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: () => import('./presentation/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./presentation/products/products.routes').then((m) => m.PRODUCTS_ROUTES),
  },
  {
    path: 'orders',
    loadChildren: () => import('./presentation/orders/orders.routes').then((m) => m.ORDERS_ROUTES),
  },
  { path: '**', redirectTo: 'users' },
];
