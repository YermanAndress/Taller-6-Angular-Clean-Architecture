/**
 * Caché genérica en memoria para entidades de dominio.
 *
 * @remarks
 * Las APIs de Node y Spring solo exponen el listado
 * (`/{recurso}/{cantidad}`) y no un endpoint de detalle por id.
 * Por eso, cada implementación de repositorio guarda la última
 * lista cargada en una instancia de esta clase y resuelve
 * `getById` buscando dentro de la caché.
 *
 * @typeParam T - Entidad de dominio, que debe exponer un `id` de tipo `string`.
 *
 * @example
 * ```ts
 * const cache = new EntityCache<User>();
 * cache.replace(usuarios); // guarda y devuelve la lista
 * const usuario = cache.find('1');
 * ```
 */
export class EntityCache<T extends { id: string }> {
  /** Mapa interno de entidades indexadas por id. */
  private readonly items = new Map<string, T>();

  /**
   * Reemplaza el contenido de la caché con la lista recibida.
   *
   * @param items - Entidades a almacenar.
   * @returns La misma lista recibida, para facilitar el encadenamiento.
   */
  replace(items: T[]): T[] {
    this.items.clear();
    for (const item of items) {
      this.items.set(item.id, item);
    }
    return items;
  }

  /**
   * Busca una entidad por su identificador.
   *
   * @param id - Identificador único de la entidad.
   * @returns La entidad encontrada o `undefined` si no existe.
   */
  find(id: string): T | undefined {
    return this.items.get(id);
  }
}
