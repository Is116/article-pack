import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingAboutComponent } from './landing-about.component';

describe('LandingAboutComponent', () => {
  let component: LandingAboutComponent;
  let fixture: ComponentFixture<LandingAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingAboutComponent]
    });
    fixture = TestBed.createComponent(LandingAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
