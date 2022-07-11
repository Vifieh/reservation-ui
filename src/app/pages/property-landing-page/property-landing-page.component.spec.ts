import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyLandingPageComponent } from './property-landing-page.component';

describe('PropertyLandingPageComponent', () => {
  let component: PropertyLandingPageComponent;
  let fixture: ComponentFixture<PropertyLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
