import { Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Contrato del repositorio de usuarios.
 *
 * @remarks
 * Clase abstracta que actúa como **token de inyección** dentro de
 * la **capa de dominio**. Define las operaciones que toda
 * implementación (local, Node o Spring) debe cumplir, sin exponer
 * detalles de infraestructura.
 *
 * @example
 * ```ts
 * constructor(private readonly repository: UserRepository) {}
 * ```
 */
export abstract class UserRepository {
  /**
   * Obtiene un listado de usuarios.
   *
   * @param count - Cantidad de usuarios a recuperar.
   * @returns Observable que emite el arreglo de {@link User}.
   */
  abstract getAll(count: number): Observable<User[]>;

  /**
   * Obtiene un usuario por su identificador.
   *
   * @param id - Identificador único del usuario.
   * @returns Observable que emite el {@link User} encontrado o `undefined`.
   */
  abstract getById(id: string): Observable<User | undefined>;
}
