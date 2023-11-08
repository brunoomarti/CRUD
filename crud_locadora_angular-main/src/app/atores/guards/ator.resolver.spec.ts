import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { AtorResolver } from './AtorResolver';

describe('atorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => AtorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
