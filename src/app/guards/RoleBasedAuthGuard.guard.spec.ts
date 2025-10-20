import { TestBed } from '@angular/core/testing';

import { RoleBasedAuthGuard } from './roleBasedAuth.guard';

describe('AuthGuard', () => {
  let guard: RoleBasedAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleBasedAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
