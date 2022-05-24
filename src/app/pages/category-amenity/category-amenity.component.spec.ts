import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAmenityComponent } from './category-amenity.component';

describe('CategoryAmenityComponent', () => {
  let component: CategoryAmenityComponent;
  let fixture: ComponentFixture<CategoryAmenityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAmenityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
