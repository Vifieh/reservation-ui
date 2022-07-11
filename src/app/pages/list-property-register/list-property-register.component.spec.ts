import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropertyRegisterComponent } from './list-property-register.component';

describe('ListPropertyRegisterComponent', () => {
  let component: ListPropertyRegisterComponent;
  let fixture: ComponentFixture<ListPropertyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPropertyRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropertyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
