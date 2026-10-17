import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';

/**
 * Caso de uso para obtener un usuario por su identificador.
 *
 * @remarks
 * Pertenece a la **capa de aplicación**. Depende únicamente del
 * contrato {@link UserRepository} y delega en él la búsqueda.
 */
@Injectable({ providedIn: 'root' })
export class GetUserByIdUseCase {
  /** Repositorio de usuarios inyectado por contrato. */
  private readonly repository = inject(UserRepository);

  /**
   * Ejecuta el caso de uso.
   *
   * @param id - Identificador único del usuario.
   * @returns Observable que emite el {@link User} encontrado o `undefined`.
   */
  execute(id: string): Observable<User | undefined> {
    return this.repository.getById(id);
  }
}
