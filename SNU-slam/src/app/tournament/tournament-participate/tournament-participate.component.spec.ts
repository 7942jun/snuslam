import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentParticipateComponent } from './tournament-participate.component';

describe('TournamentParticipateComponent', () => {
  let component: TournamentParticipateComponent;
  let fixture: ComponentFixture<TournamentParticipateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentParticipateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentParticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
