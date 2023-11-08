import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { TitulosResolver } from './titulos.resolver';

describe('titulosResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => TitulosResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
