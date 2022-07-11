import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyNavbarComponent } from './property-navbar.component';

describe('PropertyNavbarComponent', () => {
  let component: PropertyNavbarComponent;
  let fixture: ComponentFixture<PropertyNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
