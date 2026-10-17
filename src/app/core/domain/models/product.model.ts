/**
 * Interfaz que representa un producto del catálogo.
 *
 * @remarks
 * Pertenece a la **capa de dominio** y describe los atributos
 * necesarios para listar y detallar un producto, sin acoplarse
 * a ningún backend específico.
 *
 * @example
 * ```ts
 * const producto: Product = {
 *   id: '1',
 *   name: 'Nevera',
 *   description: 'Nevera de dos puertas',
 *   price: 1899.99,
 *   category: 'Electrodomésticos',
 *   stock: 12,
 * };
 * ```
 */
export interface Product {
  /** Identificador único del producto. */
  id: string;

  /** Nombre comercial del producto. */
  name: string;

  /** Descripción detallada del producto. */
  description: string;

  /** Precio unitario del producto. */
  price: number;

  /** Categoría a la que pertenece el producto. */
  category: string;

  /** Unidades disponibles en inventario. */
  stock: number;
}
