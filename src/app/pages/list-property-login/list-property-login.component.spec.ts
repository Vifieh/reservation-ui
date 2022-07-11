import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropertyLoginComponent } from './list-property-login.component';

describe('ListPropertyLoginComponent', () => {
  let component: ListPropertyLoginComponent;
  let fixture: ComponentFixture<ListPropertyLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPropertyLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropertyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
