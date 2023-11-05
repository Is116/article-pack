import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticalContentComponent } from './view-artical-content.component';

describe('ViewArticalContentComponent', () => {
  let component: ViewArticalContentComponent;
  let fixture: ComponentFixture<ViewArticalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewArticalContentComponent]
    });
    fixture = TestBed.createComponent(ViewArticalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
