import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentCreateComponent } from './tournament-create.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { of, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Tournament } from '../../tournament';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { ExpectedConditions } from 'protractor';

const mockTournamentList: Tournament[] = [
  {id: 1, title: 'test1', host: 1, teams: [1, 2, 3, 4], game_type: 3,
    total_team: 8, result1: [-1, -1, -1, -1], result2: [-1, -1], result3: [-1], reward: 'test1', state: 2},
  {id: 2, title: 'test2', host: 2, teams: [1, 2, 3, 4], game_type: 5,
    total_team: 8, result1: [-1, -1, -1, -1], result2: [-1, -1], result3: [-1], reward: 'test2', state: 2}
];

describe('TournamentCreateComponent', () => {
  let component: TournamentCreateComponent;
  let fixture: ComponentFixture<TournamentCreateComponent>;

  let httpClient: HttpClient;
  let tournamentService: jasmine.SpyObj<TournamentService>;
  // let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const tournamentSpy = jasmine.createSpyObj('TournamentService', ['addTournament', 'getTournaments']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const componentSpy = jasmine.createSpyObj('TournamentCreateComponent', ['addTournament']);
    TestBed.configureTestingModule({
      declarations: [ TournamentCreateComponent ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: TournamentService, useValue: tournamentSpy},
        { provide: Router,            useValue: routerSpy },
        { provide: TournamentCreateComponent, useValue: componentSpy},
      ],
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentCreateComponent);
    component = fixture.componentInstance;
    tournamentService = TestBed.get(TournamentService);
    tournamentService.getTournaments.and.returnValue(of(mockTournamentList));
    tournamentService.addTournament.and.returnValue(of(null));
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

  it('should not add tournament when there is a missing content', () => {
    component.title = '';
    component.prize = '';
    component.game_type = null;
    component.total_team = null;
    component.addTournament();
  });

  it('should add tournament', async(() => {
    component.title = 'title';
    component.game_type = 3;
    component.total_team = 4;
    component.prize = 'prize';
    const string = 'Title: ' + component.title + '\n' + 'Type: ' + component.game_type + ':' + component.game_type + '\n'
      + 'Total Teams: ' + component.total_team + ' teams' + '\n' + 'Prize: ' + component.prize + '\n' + 'Is it correct?';
    spyOn(window, 'confirm');
    component.addTournament();
    expect(window.confirm).toHaveBeenCalledWith(string);
    const check = true;
    expect(check).toEqual(true);
    tournamentService.addTournament.and.returnValue(of(null));
    expect(tournamentService.addTournament).toHaveBeenCalled();
  }));

  it('should not add tournament when click cancle of confirm message', () => {
    component.title = 'title';
    component.game_type = 3;
    component.total_team = 4;
    component.prize = 'prize';
    const string = 'Title: ' + component.title + '\n' + 'Type: ' + component.game_type + ':' + component.game_type + '\n'
      + 'Total Teams: ' + component.total_team + ' teams' + '\n' + 'Prize: ' + component.prize + '\n' + 'Is it correct?';
    const check = false;
    expect(check).toEqual(false);
    spyOn(window, 'confirm');
    component.addTournament();
    expect(window.confirm).toHaveBeenCalledWith(string);
  });

});
