import { Routes } from '@angular/router';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersListComponent } from './users-list/users-list.component';

/**
 * Rutas del módulo de usuarios.
 *
 * @remarks
 * Se cargan de forma perezosa desde {@link routes}.
 */
export const USERS_ROUTES: Routes = [
  { path: '', component: UsersListComponent },
  { path: ':id', component: UsersDetailComponent },
];
