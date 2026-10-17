/**
 * Estados posibles de una orden.
 *
 * @remarks
 * Se expone como una constante `as const` para poder reutilizar
 * la lista en formularios o validaciones y, a la vez, derivar
 * de ella el tipo {@link OrderStatus}.
 *
 * @example
 * ```ts
 * const estados = ORDER_STATUSES; // ['pending', 'shipped', 'delivered', 'cancelled']
 * ```
 */
export const ORDER_STATUSES = ['pending', 'shipped', 'delivered', 'cancelled'] as const;

/**
 * Tipo que representa el estado de una orden.
 *
 * @remarks
 * Se deriva automáticamente de {@link ORDER_STATUSES}.
 */
export type OrderStatus = (typeof ORDER_STATUSES)[number];

/**
 * Interfaz que representa una orden de compra.
 *
 * @remarks
 * Pertenece a la **capa de dominio**. Relaciona un cliente con
 * un producto, su cantidad y el total calculado, además del
 * estado y la fecha de creación.
 *
 * @example
 * ```ts
 * const orden: Order = {
 *   id: '1',
 *   customer: 'Ana Gómez',
 *   product: 'Nevera',
 *   quantity: 2,
 *   total: 3799.98,
 *   status: 'pending',
 *   createdAt: new Date().toISOString(),
 * };
 * ```
 */
export interface Order {
  /** Identificador único de la orden. */
  id: string;

  /** Nombre del cliente que realiza la orden. */
  customer: string;

  /** Nombre del producto solicitado. */
  product: string;

  /** Cantidad de unidades solicitadas. */
  quantity: number;

  /** Valor total de la orden. */
  total: number;

  /** Estado actual de la orden. */
  status: OrderStatus;

  /** Fecha de creación de la orden en formato ISO 8601. */
  createdAt: string;
}
