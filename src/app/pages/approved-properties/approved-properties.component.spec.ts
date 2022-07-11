import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPropertiesComponent } from './approved-properties.component';

describe('ApprovedPropertiesComponent', () => {
  let component: ApprovedPropertiesComponent;
  let fixture: ComponentFixture<ApprovedPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
