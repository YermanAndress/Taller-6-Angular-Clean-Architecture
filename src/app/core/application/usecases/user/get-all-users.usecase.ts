import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';

/**
 * Caso de uso para obtener el listado de usuarios.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Depende únicamente del
 * contrato {@link UserRepository} y delega en él la obtención
 * de los datos.
 */
@Injectable({ providedIn: 'root' })
export class GetAllUsersUseCase {
  /** Repositorio de usuarios inyectado por contrato. */
  private readonly repository = inject(UserRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param count - Cantidad de usuarios a recuperar.
   * @returns Observable que emite el arreglo de {@link User}.
   */
  execute(count: number): Observable<User[]> {
    return this.repository.getAll(count);
  }
}
