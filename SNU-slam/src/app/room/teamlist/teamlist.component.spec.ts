import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output } from '@angular/core';
import { TeamlistComponent } from './teamlist.component';
import { User } from '../../user';

const mockplay_time = 60;
const mockisStarted = false;
const mockBlueteam: User[] = [
  { id: 1, email: 'swpp1@snu.ac.kr', password: '11', username : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000, team: 2 },
  { id: 2, email: 'swpp2@snu.ac.kr', password: '11', username : 'user_2', position: 'pf', wins: 5, loses: 3, teams_id: [1], point: 1200, team: 2 }
];
const mockRedteam: User[] = [
  { id: 3, email: 'swpp3@snu.ac.kr', password: '11', username : 'user_3', position: 'sf', wins: 4, loses: 5, teams_id: [1], point: 1400, team: 1 },
  { id: 4, email: 'swpp4@snu.ac.kr', password: '11', username : 'user_4', position: 'sg', wins: 2, loses: 4, teams_id: [1], point: 700, team: 1 },
  { id: 5, email: 'swpp5@snu.ac.kr', password: '11', username : 'user_5', position: 'pg', wins: 2, loses: 2, teams_id: [], point: 900, team: 1 }
];

@Component({selector: 'app-ingame', template: ''})
export class MockIngameComponent {
  @Input()
  isStarted: boolean;

  @Input()
  play_time: number;

}

describe('TeamlistComponent', () => {
  let component: TeamlistComponent;
  let fixture: ComponentFixture<TeamlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamlistComponent,
        MockIngameComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamlistComponent);
    component = fixture.componentInstance;
    component.play_time = mockplay_time;
    component.isStarted = mockisStarted;
    component.blueteam = mockBlueteam;
    component.redteam = mockRedteam;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit toggled null', () => {
    component.changeteam.subscribe(
      () => {}
    );
   // component.changeteam(null);
  });
});
