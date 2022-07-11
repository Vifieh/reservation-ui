import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommenderPageComponent } from './recommender-page.component';

describe('RecommenderPageComponent', () => {
  let component: RecommenderPageComponent;
  let fixture: ComponentFixture<RecommenderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommenderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommenderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
