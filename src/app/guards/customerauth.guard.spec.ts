import { TestBed } from '@angular/core/testing';

import { CustomerauthGuard } from './customerauth.guard';

describe('CustomerauthGuard', () => {
  let guard: CustomerauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CustomerauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
