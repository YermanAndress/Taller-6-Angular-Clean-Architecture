import { Order } from '../core/domain/models/order.model';
import { Product } from '../core/domain/models/product.model';
import { User } from '../core/domain/models/user.model';

/**
 * Usuarios de ejemplo para pruebas.
 */
export const USERS: User[] = [
  {
    id: '1',
    fullName: 'Ana Gómez',
    email: 'ana.gomez@example.com',
    phone: '3001112233',
    city: 'Tuluá',
  },
  {
    id: '2',
    fullName: 'Carlos Ramírez',
    email: 'carlos.ramirez@example.com',
    phone: '3004445566',
    city: 'Cali',
  },
];

/**
 * Productos de ejemplo para pruebas.
 */
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nevera',
    description: 'Nevera de dos puertas',
    price: 1899.99,
    category: 'Electrodomésticos',
    stock: 12,
  },
  {
    id: '2',
    name: 'Televisor',
    description: 'Televisor LED 55 pulgadas',
    price: 2499.5,
    category: 'Electrónica',
    stock: 5,
  },
];

/**
 * Órdenes de ejemplo para pruebas.
 */
export const ORDERS: Order[] = [
  {
    id: '1',
    customer: 'Ana Gómez',
    product: 'Nevera',
    quantity: 2,
    total: 3799.98,
    status: 'pending',
    createdAt: '2026-01-01T10:00:00.000Z',
  },
  {
    id: '2',
    customer: 'Carlos Ramírez',
    product: 'Televisor',
    quantity: 1,
    total: 2499.5,
    status: 'delivered',
    createdAt: '2026-02-15T15:30:00.000Z',
  },
];
