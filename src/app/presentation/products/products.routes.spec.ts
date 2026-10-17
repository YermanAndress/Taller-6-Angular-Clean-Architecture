import { PRODUCTS_ROUTES } from './products.routes';

describe('PRODUCTS_ROUTES', () => {
  it('debe definir una ruta de listado y una de detalle', () => {
    expect(PRODUCTS_ROUTES.length).toBe(2);
    expect(PRODUCTS_ROUTES[0].path).toBe('');
    expect(PRODUCTS_ROUTES[1].path).toBe(':id');
  });
});
