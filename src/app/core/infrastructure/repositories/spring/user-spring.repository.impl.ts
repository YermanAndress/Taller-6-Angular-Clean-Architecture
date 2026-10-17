import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../../../domain/models/user.model';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { SPRING_API_URL } from '../../config/backend.config';
import { UserService } from '../../services/user.service';
import { EntityCache } from '../entity-cache';

/**
 * Implementación del repositorio de usuarios para el backend Spring Boot.
 *
 * @remarks
 * Consume {@link UserService} usando la URL {@link SPRING_API_URL} y
 * guarda la última lista en {@link EntityCache} para resolver
 * `getById`.
 *
 * Si el contrato del backend difiere del modelo de dominio, el
 * mapeo DTO -> dominio debe realizarse aquí, justo antes de
 * guardar en la caché.
 */
@Injectable()
export class UserSpringRepositoryImpl extends UserRepository {
  /** Servicio HTTP de usuarios. */
  private readonly service = inject(UserService);

  /** URL base del backend Spring Boot. */
  private readonly baseUrl = inject(SPRING_API_URL);

  /** Caché en memoria de la última lista obtenida. */
  private readonly cache = new EntityCache<User>();

  /**
   * Obtiene usuarios desde el backend Spring Boot.
   *
   * @param count - Cantidad de usuarios a solicitar.
   * @returns Observable que emite el arreglo de {@link User}.
   */
  getAll(count: number): Observable<User[]> {
    // Aquí se mapearía el DTO a User si el contrato del backend difiere.
    return this.service.getAll(this.baseUrl, count).pipe(map((items) => this.cache.replace(items)));
  }

  /**
   * Busca un usuario en la última lista cargada.
   *
   * @param id - Identificador único del usuario.
   * @returns Observable que emite el {@link User} encontrado o `undefined`.
   */
  getById(id: string): Observable<User | undefined> {
    return of(this.cache.find(id));
  }
}
