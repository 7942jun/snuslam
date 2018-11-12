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

const mockTournamentList: Tournament[] = [
  {id: 1, title: 'test1', host: 1, teams: [1, 2, 3, 4], game_type: 3,
    total_team: 4, result: [1, 2, 3, 4], reward: 'test1', state: 2},
  {id: 2, title: 'test2', host: 2, teams: [1, 2, 3, 4], game_type: 5,
    total_team: 4, result: [1, 2, 3, 4], reward: 'test2', state: 2}
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
  
});
