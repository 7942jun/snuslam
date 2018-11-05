import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentOngoingComponent } from './tournament-ongoing.component';

describe('TournamentOngoingComponent', () => {
  let component: TournamentOngoingComponent;
  let fixture: ComponentFixture<TournamentOngoingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentOngoingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
