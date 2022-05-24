import { TestBed } from '@angular/core/testing';

import { RoomNameService } from './room-name.service';

describe('RoomNameService', () => {
  let service: RoomNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
