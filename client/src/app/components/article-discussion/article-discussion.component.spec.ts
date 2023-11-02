import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDiscussionComponent } from './article-discussion.component';

describe('ArticleDiscussionComponent', () => {
  let component: ArticleDiscussionComponent;
  let fixture: ComponentFixture<ArticleDiscussionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleDiscussionComponent]
    });
    fixture = TestBed.createComponent(ArticleDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
