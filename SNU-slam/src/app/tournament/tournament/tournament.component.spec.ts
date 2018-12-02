import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentComponent } from './tournament.component';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { of, Observable } from 'rxjs';
import { Tournament } from '../../tournament';
// import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

const mockTournamentList: Tournament[] = [
  {id: 1, title: 'test1', host: 1, teams: [1, 2, 3, 4], game_type: 3,
    total_team: 8, result1: [-1, -1, -1, -1], result2: [-1, -1], result3: [-1], reward: 'test1', state: 2},
  {id: 2, title: 'test2', host: 2, teams: [1, 2, 3, 4], game_type: 5,
    total_team: 8, result1: [-1, -1, -1, -1], result2: [-1, -1], result3: [-1], reward: 'test2', state: 2}
];


describe('TournamentComponent', () => {
  let component: TournamentComponent;
  let fixture: ComponentFixture<TournamentComponent>;

  // let httpClient: HttpClient;
  let tournamentService: jasmine.SpyObj<TournamentService>;
  // let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const tournamentSpy = jasmine.createSpyObj('TournamentService', ['getTournaments', 'updateTournament', 'deleteTournament']);
    // const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ TournamentComponent ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: TournamentService, useValue: tournamentSpy},
        // { provide: Router,      useValue: routerSpy },
      ],
    })
    .compileComponents();
    // httpClient = TestBed.get(HttpClient);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentComponent);
    component = fixture.componentInstance;
    tournamentService = TestBed.get(TournamentService);
    tournamentService.getTournaments.and.returnValue(of(mockTournamentList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve all tournaments at ngOnInit', async(() => {
    tournamentService.getTournaments.and.returnValue(of(mockTournamentList));
    component.ngOnInit();
    expect(component.tournaments).toEqual(mockTournamentList);
    expect(tournamentService.getTournaments).toHaveBeenCalled();
  }));

  it('should be able to accept tournament', async(() => {
    const mockTournamentChanged: Tournament = {...mockTournamentList[0]};
    mockTournamentChanged.state = 2;
    tournamentService.updateTournament.and.returnValue(of(null));

    component.acceptTournament(mockTournamentChanged);
    fixture.detectChanges();

    expect(component.tournaments[0]).toEqual(mockTournamentChanged);
    expect(tournamentService.updateTournament).toHaveBeenCalled();
  }));

  it('should be able to remove tournament', async(() => {
    const mockTournamentChanged: Tournament[] = mockTournamentList.slice(1, 2);
    tournamentService.deleteTournament.and.returnValue(of(null));

    component.deleteTournament(mockTournamentList[0]);
    fixture.detectChanges();

    expect(component.tournaments).toEqual(mockTournamentChanged);
    expect(tournamentService.deleteTournament).toHaveBeenCalled();
  }));

  it('should return 승인 중 when state is 1', () => {
    const returnValue = component.state(1);
    expect(returnValue).toEqual('승인 중');
  });
  it('should return 신청 중 when state is 2', () => {
    const returnValue = component.state(2);
    expect(returnValue).toEqual('신청 중');
  });
  it('should return 진행 중 when state is 3', () => {
    const returnValue = component.state(3);
    expect(returnValue).toEqual('진행 중');
  });
  it('should return 종료 when state is 4', () => {
    const returnValue = component.state(4);
    expect(returnValue).toEqual('종료');
  });

});
