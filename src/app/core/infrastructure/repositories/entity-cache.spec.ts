import { EntityCache } from './entity-cache';

interface Dummy {
  id: string;
  name: string;
}

describe('EntityCache', () => {
  let cache: EntityCache<Dummy>;

  beforeEach(() => {
    cache = new EntityCache<Dummy>();
  });

  it('debe devolver la misma lista recibida al reemplazar', () => {
    const items: Dummy[] = [
      { id: '1', name: 'Uno' },
      { id: '2', name: 'Dos' },
    ];
    expect(cache.replace(items)).toBe(items);
  });

  it('debe encontrar una entidad por su id', () => {
    const items: Dummy[] = [
      { id: '1', name: 'Uno' },
      { id: '2', name: 'Dos' },
    ];
    cache.replace(items);
    expect(cache.find('2')).toEqual(items[1]);
  });

  it('debe devolver undefined para un id desconocido', () => {
    cache.replace([{ id: '1', name: 'Uno' }]);
    expect(cache.find('999')).toBeUndefined();
  });

  it('debe reemplazar la lista anterior en cada llamada a replace', () => {
    cache.replace([{ id: '1', name: 'Uno' }]);
    cache.replace([{ id: '2', name: 'Dos' }]);
    expect(cache.find('1')).toBeUndefined();
    expect(cache.find('2')).toEqual({ id: '2', name: 'Dos' });
  });
});
