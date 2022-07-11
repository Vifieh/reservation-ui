import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPropertiesComponent } from './pending-properties.component';

describe('PendingPropertiesComponent', () => {
  let component: PendingPropertiesComponent;
  let fixture: ComponentFixture<PendingPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
