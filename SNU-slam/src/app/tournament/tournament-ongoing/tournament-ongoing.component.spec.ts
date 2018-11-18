import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentOngoingComponent } from './tournament-ongoing.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { of, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Tournament } from '../../tournament';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { ExpectedConditions } from 'protractor';
import { convertToParamMap} from '@angular/router';


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
        { provide: ActivatedRoute,       useValue: {
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
    expect(tournamentService.getTournaments).toHaveBeenCalled();
  }));

});
