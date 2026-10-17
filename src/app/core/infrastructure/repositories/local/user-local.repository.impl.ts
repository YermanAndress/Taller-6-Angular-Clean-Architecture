import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';
import { User } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { EntityCache } from '../entity-cache';

/**
 * Implementación local del repositorio de usuarios.
 *
 * @remarks
 * Genera datos de ejemplo con `@faker-js/faker` y los cachea en
 * memoria mediante {@link EntityCache} para poder resolver
 * `getById` sin backend.
 */
@Injectable()
export class UserLocalRepositoryImpl extends UserRepository {
  /** Caché en memoria de la última lista generada. */
  private readonly cache = new EntityCache<User>();

  /**
   * Genera y devuelve un listado de usuarios aleatorios.
   *
   * @param count - Cantidad de usuarios a generar.
   * @returns Observable que emite el arreglo de {@link User}.
   */
  getAll(count: number): Observable<User[]> {
    const users: User[] = Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      city: faker.location.city(),
    }));
    return of(this.cache.replace(users));
  }

  /**
   * Busca un usuario en la última lista generada.
   *
   * @param id - Identificador único del usuario.
   * @returns Observable que emite el {@link User} encontrado o `undefined`.
   */
  getById(id: string): Observable<User | undefined> {
    return of(this.cache.find(id));
  }
}
