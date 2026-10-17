import { USERS_ROUTES } from './users.routes';

describe('USERS_ROUTES', () => {
  it('debe definir una ruta de listado y una de detalle', () => {
    expect(USERS_ROUTES.length).toBe(2);
    expect(USERS_ROUTES[0].path).toBe('');
    expect(USERS_ROUTES[1].path).toBe(':id');
  });
});
