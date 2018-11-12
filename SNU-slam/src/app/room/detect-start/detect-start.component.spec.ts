import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectStartComponent } from './detect-start.component';

describe('DetectStartComponent', () => {
  let component: DetectStartComponent;
  let fixture: ComponentFixture<DetectStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
