import { appConfig } from './app.config';

describe('appConfig', () => {
  it('debe registrar providers globales', () => {
    expect(appConfig.providers.length).toBeGreaterThan(0);
  });
});
