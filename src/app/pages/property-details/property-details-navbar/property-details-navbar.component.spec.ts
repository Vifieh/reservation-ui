import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailsNavbarComponent } from './property-details-navbar.component';

describe('PropertyDetailsNavbarComponent', () => {
  let component: PropertyDetailsNavbarComponent;
  let fixture: ComponentFixture<PropertyDetailsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyDetailsNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDetailsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
