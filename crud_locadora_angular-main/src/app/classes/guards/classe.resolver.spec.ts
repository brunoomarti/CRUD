import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { ClasseResolver } from './ClasseResolver';

describe('classeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => ClasseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
