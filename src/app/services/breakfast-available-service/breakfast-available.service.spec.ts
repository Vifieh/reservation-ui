import { TestBed } from '@angular/core/testing';

import { BreakfastAvailableService } from './breakfast-available.service';

describe('BreakfastAvailableService', () => {
  let service: BreakfastAvailableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakfastAvailableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
