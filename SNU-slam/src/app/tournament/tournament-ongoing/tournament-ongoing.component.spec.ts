import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentOngoingComponent } from './tournament-ongoing.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { of, Observable } from 'rxjs';
import { Tournament } from '../../tournament';


const mockTournament: Tournament = {id: 1, title: 'test1', host: 1, teams: [1, 2, 3, 4], game_type: 3,
total_team: 8, result1: [-1, -1, -1, -1], result2: [-1, -1], result3: [-1], reward: 'test1', state: 2};

describe('TournamentOngoingComponent', () => {
  let component: TournamentOngoingComponent;
  let fixture: ComponentFixture<TournamentOngoingComponent>;

  let httpClient: HttpClient;
  let tournamentService: jasmine.SpyObj<TournamentService>;

  beforeEach(async(() => {
    const tournamentSpy = jasmine.createSpyObj('TournamentService', ['getTournamentById', 'updateTournament']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    TestBed.configureTestingModule({
      declarations: [ TournamentOngoingComponent ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: TournamentService, useValue: tournamentSpy},
        { provide: Router,            useValue: routerSpy },
        { provide: ActivatedRoute,    useValue: {
          snapshot: {
            paramMap: convertToParamMap({
              id: '1'
            })
          }
        } },
      ],
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentOngoingComponent);
    component = fixture.componentInstance;
    tournamentService = TestBed.get(TournamentService);
    tournamentService.updateTournament.and.returnValue(of(null));
    tournamentService.getTournamentById.and.returnValue(of(mockTournament));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve tournament by id at ngOnInit', async(() => {
    tournamentService.getTournamentById.and.returnValue(of(mockTournament));
    component.ngOnInit();
    expect(component.tournament).toEqual(mockTournament);
    expect(tournamentService.getTournamentById).toHaveBeenCalled();
  }));

  it('should not update color when there is no result', () => {
    component.tournament.result1 = [-1, -1, -1, -1];
    component.tournament.result2 = [-1, -1];
    component.tournament.result3 = [-1];
    component.updateColor();
  });

  it('should update color when there is a result1', async(() => {
    component.tournament.result1 = [1, -1, -1, -1];
    const id = 'r1' + component.tournament.result1[0];
    component.updateColor();
  }));

  it('should update color when there is a result2', async(() => {
    component.tournament.result2 = [1, -1];
    const temp = Math.floor((component.tournament.result2[0] - 1) / 2) + 1;
    const id = 'r2' + temp;
    component.updateColor();
  }));

  it('should update color when there is a result3', async(() => {
    component.tournament.result3 = [1];
    const temp = Math.floor((component.tournament.result3[0] - 1) / 2) + 1;
    const id = 'r3' + temp;
    const id2 = 'r4';
    component.updateColor();
  }));

  // tests for result1()
  it('should not react when there is result1 already for result1', async(() => {
    const team = 1;
    const temp = Math.floor((team - 1) / 2);
    component.tournament.result1 = [1, -1, -1, -1];
    expect(component.tournament.result1[temp]).not.toEqual(-1);
    component.result1(1, 'r11');
  }));

  it('should not react when cancel confirm message for result1', async(() => {
    const team = 1;
    const temp = Math.floor((team - 1) / 2);
    component.tournament.result1 = [-1, -1, -1, -1];
    expect(component.tournament.result1[temp]).toEqual(-1);
    const string = 'Team ' + team + ' won the game. Is it true?';
    spyOn(window, 'confirm').and.returnValue(false);
    component.result1(1, 'r11');
    expect(window.confirm).toHaveBeenCalledWith(string);
    expect(tournamentService.updateTournament).not.toHaveBeenCalled();
  }));

  it('should update color and result1 when accept confirm message for result1', async(() => {
    const team = 1;
    const temp = Math.floor((team - 1) / 2);
    component.tournament.result1 = [-1, -1, -1, -1];
    expect(component.tournament.result1[temp]).toEqual(-1);
    const string = 'Team ' + team + ' won the game. Is it true?';
    spyOn(window, 'confirm').and.returnValue(true);
    component.result1(1, 'r11');
    expect(window.confirm).toHaveBeenCalledWith(string);
    expect(component.tournament.result1[temp]).toEqual(team);
    expect(tournamentService.updateTournament).toHaveBeenCalled();
  }));

  // test for result2()
  it('should not react when there is not result2', async(() => {
    const team = -1;
    expect(team).toEqual(-1);
    component.result2(-1, 'r21');
  }));

  it('should not react when there is already result2', async(() => {
    const team = 1;
    const temp = Math.floor((team - 1) / 4);
    component.tournament.result2 = [1, -1];
    expect(component.tournament.result2[temp]).not.toEqual(-1);
    component.result2(1, 'r21');
    expect(tournamentService.updateTournament).not.toHaveBeenCalled();
  }));

  it('should not react when cancel confirm message for result2', async(() => {
    const team = 1;
    const temp = Math.floor((team - 1) / 4);
    component.tournament.result2 = [-1, -1];
    expect(component.tournament.result2[temp]).toEqual(-1);
    const string = 'Team ' + team + ' won the game. Is it true?';
    spyOn(window, 'confirm').and.returnValue(false);
    component.result2(1, 'r21');
    expect(window.confirm).toHaveBeenCalledWith(string);
    expect(tournamentService.updateTournament).not.toHaveBeenCalled();
  }));

  it('should react when accept confirm message for result2', async(() => {
    const team = 1;
    const temp = Math.floor((team - 1) / 4);
    component.tournament.result2 = [-1, -1];
    expect(component.tournament.result2[temp]).toEqual(-1);
    const string = 'Team ' + team + ' won the game. Is it true?';
    spyOn(window, 'confirm').and.returnValue(true);
    component.result2(1, 'r21');
    expect(window.confirm).toHaveBeenCalledWith(string);
    expect(tournamentService.updateTournament).toHaveBeenCalled();
  }));


  // test for result3()
  it('should not react when there is not result3', async(() => {
    const team = -1;
    expect(team).toEqual(-1);
    component.result3(-1, 'r31');
  }));

  it('should not react when there is already result3', async(() => {
    const team = 1;
    component.tournament.result3 = [1];
    expect(component.tournament.result3[0]).not.toEqual(-1);
    component.result3(1, 'r31');
    expect(tournamentService.updateTournament).not.toHaveBeenCalled();
  }));

  it('should not react when cancel confirm message for result3', async(() => {
    const team = 1;
    component.tournament.result3 = [-1];
    expect(component.tournament.result3[0]).toEqual(-1);
    const string = 'Team ' + team + ' won the game. Is it true?';
    spyOn(window, 'confirm').and.returnValue(false);
    component.result3(1, 'r31');
    expect(window.confirm).toHaveBeenCalledWith(string);
    expect(tournamentService.updateTournament).not.toHaveBeenCalled();
  }));

  it('should react when accept confirm message for result3', async(() => {
    const team = 1;
    component.tournament.result3 = [-1];
    expect(component.tournament.result3[0]).toEqual(-1);
    const string = 'Team ' + team + ' won the game. Is it true?';
    spyOn(window, 'confirm').and.returnValue(true);
    component.result3(1, 'r31');
    expect(window.confirm).toHaveBeenCalledWith(string);
    expect(tournamentService.updateTournament).toHaveBeenCalled();
  }));


  // tests for quarterFinals()
  it('should not return nothing about quarterFinals(0) when there is no result', () => {
    const nth = 0;
    component.tournament.result1 = [-1, -1, -1, -1];
    const returnValue = component.quarterFinals(nth);
    expect(returnValue).toEqual('');
  });

  it('should return team number about quarterFinals(0) when there is result', () => {
    const nth = 0;
    component.tournament.result1 = [1, -1, -1, -1];
    const returnValue = component.quarterFinals(nth);
    expect(returnValue).toEqual('Team 1');
  });

  it('should not return nothing about quarterFinals(1) when there is no result', () => {
    const nth = 1;
    component.tournament.result1 = [-1, -1, -1, -1];
    const returnValue = component.quarterFinals(nth);
    expect(returnValue).toEqual('');
  });

  it('should return team number about quarterFinals(1) when there is result', () => {
    const nth = 1;
    component.tournament.result1 = [-1, 3, -1, -1];
    const returnValue = component.quarterFinals(nth);
    expect(returnValue).toEqual('Team 3');
  });

  it('should not return nothing about quarterFinals(2) when there is no result', () => {
    const nth = 2;
    component.tournament.result1 = [-1, -1, -1, -1];
    const returnValue = component.quarterFinals(nth);
    expect(returnValue).toEqual('');
  });

  it('should return team number about quarterFinals(2) when there is result', () => {
    const nth = 2;
    component.tournament.result1 = [-1, -1, 5, -1];
    const returnValue = component.quarterFinals(nth);
    expect(returnValue).toEqual('Team 5');
  });

  it('should not return nothing about quarterFinals(3) when there is no result', () => {
    const nth = 3;
    component.tournament.result1 = [-1, -1, -1, -1];
    const returnValue = component.quarterFinals(nth);
    expect(returnValue).toEqual('');
  });

  it('should return team number about quarterFinals(3) when there is result', () => {
    const nth = 3;
    component.tournament.result1 = [-1, -1, -1, 7];
    const returnValue = component.quarterFinals(nth);
    expect(returnValue).toEqual('Team 7');
  });


  // tests for semiFinals()
  it('should not return nothing about semiFinals(0) when there is no result', () => {
    const nth = 0;
    component.tournament.result2 = [-1, -1];
    const returnValue = component.semiFinals(nth);
    expect(returnValue).toEqual('');
  });

  it('should return team number about semiFinals(0) when there is result', () => {
    const nth = 0;
    component.tournament.result2 = [1, -1];
    const returnValue = component.semiFinals(nth);
    expect(returnValue).toEqual('Team 1');
  });

  it('should not return nothing about semiFinals(1) when there is no result', () => {
    const nth = 1;
    component.tournament.result2 = [-1, -1];
    const returnValue = component.semiFinals(nth);
    expect(returnValue).toEqual('');
  });

  it('should return team number about semiFinals(1) when there is result', () => {
    const nth = 1;
    component.tournament.result2 = [-1, 5];
    const returnValue = component.semiFinals(nth);
    expect(returnValue).toEqual('Team 5');
  });



  // tests form final()
  it('should not return nothing about final() when there is no result', () => {
    component.tournament.result3 = [-1];
    const returnValue = component.final();
    expect(returnValue).toEqual('');
  });

  it('should return team number about final() when there is result', () => {
    component.tournament.result3 = [1];
    const returnValue = component.final();
    expect(returnValue).toEqual('Team 1');
  });
});
