import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropertyCompletionComponent } from './list-property-completion.component';

describe('ListPropertyCompletionComponent', () => {
  let component: ListPropertyCompletionComponent;
  let fixture: ComponentFixture<ListPropertyCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPropertyCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPropertyCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
