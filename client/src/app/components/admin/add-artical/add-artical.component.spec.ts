import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticalComponent } from './add-artical.component';

describe('AddArticalComponent', () => {
  let component: AddArticalComponent;
  let fixture: ComponentFixture<AddArticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddArticalComponent]
    });
    fixture = TestBed.createComponent(AddArticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
