import { ORDERS_ROUTES } from './orders.routes';

describe('ORDERS_ROUTES', () => {
  it('debe definir una ruta de listado y una de detalle', () => {
    expect(ORDERS_ROUTES.length).toBe(2);
    expect(ORDERS_ROUTES[0].path).toBe('');
    expect(ORDERS_ROUTES[1].path).toBe(':id');
  });
});
