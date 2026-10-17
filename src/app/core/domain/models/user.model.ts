/**
 * Interfaz que representa un usuario del sistema.
 *
 * @remarks
 * Pertenece a la **capa de dominio** y modela la información mínima
 * que la aplicación necesita de un usuario. No conoce detalles de
 * infraestructura ni de presentación.
 *
 * @example
 * ```ts
 * const usuario: User = {
 *   id: '1',
 *   fullName: 'Ana Gómez',
 *   email: 'ana.gomez@example.com',
 *   phone: '3001234567',
 *   city: 'Tuluá',
 * };
 * ```
 */
export interface User {
  /** Identificador único del usuario. */
  id: string;

  /** Nombre completo del usuario. */
  fullName: string;

  /** Correo electrónico del usuario. */
  email: string;

  /** Número de teléfono del usuario. */
  phone: string;

  /** Ciudad de residencia del usuario. */
  city: string;
}
