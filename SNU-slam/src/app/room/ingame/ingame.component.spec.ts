import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input,  OnChanges, SimpleChange } from '@angular/core';
import { IngameComponent } from './ingame.component';


const mockplay_time = 60;
const mockisStarted = false;

@Component({selector: 'countdown-timer', template: ''})
export class MocktimerComponent {
  @Input() end: Date;
}

describe('IngameComponent', () => {
  let component: IngameComponent;
  let fixture: ComponentFixture<IngameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IngameComponent,
        MocktimerComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngameComponent);
    component = fixture.componentInstance;
    component.isStarted = mockisStarted;
    component.play_time = mockplay_time;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should detect change', () => {
    component.isStarted = true;
    component.ngOnChanges({
      isStarted: new SimpleChange(null, component.isStarted, true)
    });
    fixture.detectChanges();
  });
});
