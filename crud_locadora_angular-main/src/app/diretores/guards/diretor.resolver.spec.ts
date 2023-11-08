import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { DiretorResolver } from './diretor-resolver.service';

describe('diretorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => DiretorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
