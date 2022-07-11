import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModalPageComponent } from './payment-modal-page.component';

describe('PaymentModalPageComponent', () => {
  let component: PaymentModalPageComponent;
  let fixture: ComponentFixture<PaymentModalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentModalPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentModalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
