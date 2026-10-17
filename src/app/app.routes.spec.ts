import { Routes } from '@angular/router';
import { routes } from './app.routes';

describe('app.routes', () => {
  it('debe redirigir la ruta vacía a users', () => {
    const root = routes.find((route) => route.path === '');
    expect(root?.redirectTo).toBe('users');
    expect(root?.pathMatch).toBe('full');
  });

  it('debe redirigir la ruta comodín a users', () => {
    const wildcard = routes.find((route) => route.path === '**');
    expect(wildcard?.redirectTo).toBe('users');
  });

  it.each(['users', 'products', 'orders'])(
    'debe cargar de forma perezosa rutas no vacías para %s',
    async (path) => {
      const route = routes.find((item) => item.path === path);
      expect(route?.loadChildren).toBeDefined();
      const loaded = await (route!.loadChildren as () => Promise<Routes>)();
      expect(Array.isArray(loaded)).toBe(true);
      expect(loaded.length).toBeGreaterThan(0);
    },
  );
});
