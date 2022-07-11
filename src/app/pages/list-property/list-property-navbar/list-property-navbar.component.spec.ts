import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropertyNavbarComponent } from './list-property-navbar.component';

describe('ListPropertyNavbarComponent', () => {
  let component: ListPropertyNavbarComponent;
  let fixture: ComponentFixture<ListPropertyNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPropertyNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropertyNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
