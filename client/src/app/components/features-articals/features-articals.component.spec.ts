import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesArticalsComponent } from './features-articals.component';

describe('FeaturesArticalsComponent', () => {
  let component: FeaturesArticalsComponent;
  let fixture: ComponentFixture<FeaturesArticalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturesArticalsComponent]
    });
    fixture = TestBed.createComponent(FeaturesArticalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
