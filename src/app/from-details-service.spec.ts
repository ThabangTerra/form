import { TestBed } from '@angular/core/testing';

import { FromDetailsService } from './from-details-service';

describe('FromDetailsService', () => {
  let service: FromDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FromDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
