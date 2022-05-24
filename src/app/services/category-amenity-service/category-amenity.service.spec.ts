import { TestBed } from '@angular/core/testing';

import { CategoryAmenityService } from './category-amenity.service';

describe('CategoryAmenityService', () => {
  let service: CategoryAmenityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryAmenityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
