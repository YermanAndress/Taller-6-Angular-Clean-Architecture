import { TestBed } from '@angular/core/testing';
import { NODE_API_URL, SPRING_API_URL } from './backend.config';

describe('backend.config', () => {
  it('debe exponer la URL por defecto de Node en el puerto 3000', () => {
    expect(TestBed.inject(NODE_API_URL)).toBe('http://localhost:3000/api');
  });

  it('debe exponer la URL por defecto de Spring en el puerto 3000', () => {
    expect(TestBed.inject(SPRING_API_URL)).toBe('http://localhost:3000/api');
  });
});
