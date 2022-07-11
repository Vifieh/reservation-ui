import { TestBed } from '@angular/core/testing';

import { BedAvailableService } from './bed-available.service';

describe('BedAvailableService', () => {
  let service: BedAvailableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedAvailableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
