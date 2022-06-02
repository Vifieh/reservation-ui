import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesServicesComponent } from './facilities-services.component';

describe('FacilitiesServicesComponent', () => {
  let component: FacilitiesServicesComponent;
  let fixture: ComponentFixture<FacilitiesServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitiesServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
