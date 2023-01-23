import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesTabComponent } from './articles-tab.component';

describe('ArticlesTabComponent', () => {
  let component: ArticlesTabComponent;
  let fixture: ComponentFixture<ArticlesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
