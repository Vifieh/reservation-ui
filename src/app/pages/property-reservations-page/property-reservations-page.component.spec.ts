import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyReservationsPageComponent } from './property-reservations-page.component';

describe('PropertyReservationsPageComponent', () => {
  let component: PropertyReservationsPageComponent;
  let fixture: ComponentFixture<PropertyReservationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyReservationsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
