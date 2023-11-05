import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticalComponent } from './edit-artical.component';

describe('EditArticalComponent', () => {
  let component: EditArticalComponent;
  let fixture: ComponentFixture<EditArticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditArticalComponent]
    });
    fixture = TestBed.createComponent(EditArticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
