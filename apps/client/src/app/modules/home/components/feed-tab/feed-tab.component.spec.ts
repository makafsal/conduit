import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTabComponent } from './feed-tab.component';

describe('FeedTabComponent', () => {
  let component: FeedTabComponent;
  let fixture: ComponentFixture<FeedTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
