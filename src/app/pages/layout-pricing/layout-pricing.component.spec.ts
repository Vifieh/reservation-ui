import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPricingComponent } from './layout-pricing.component';

describe('LayoutPricingComponent', () => {
  let component: LayoutPricingComponent;
  let fixture: ComponentFixture<LayoutPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
