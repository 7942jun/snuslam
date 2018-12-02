import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentParticipateComponent } from './tournament-participate.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { TeamService } from '../team.service';
import { AuthService } from '../../auth/auth.service';
import { of, Observable } from 'rxjs';
import { Tournament } from '../../tournament';
import { User } from '../../user';
import { Team } from '../../team';

const mockTournament: Tournament = {id: 1, title: 'test1', host: 1, teams: [], game_type: 3,
total_team: 8, result1: [-1, -1, -1, -1], result2: [-1, -1], result3: [-1], reward: 'test1', state: 2};

const mockTeam: Team = {id: 1, name: 'team1name', leader_id: 1,
  members_id: []};

const mockUser: User = { id: 1, email: 'swpp3@snu.ac.kr', password: '11', username : 'user_3', position: 'sf', wins: 4, loses: 5, teams_id: [1], point: 1400, team: 1 };

describe('TournamentParticipateComponent', () => {
  let component: TournamentParticipateComponent;
  let fixture: ComponentFixture<TournamentParticipateComponent>;

  let httpClient: HttpClient;
  let tournamentService: jasmine.SpyObj<TournamentService>;
  let teamService: jasmine.SpyObj<TeamService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    const tournamentSpy = jasmine.createSpyObj('TournamentService', ['updateTournament', 'getTournamentById']);
    const teamSpy = jasmine.createSpyObj('TeamService', ['addTeam']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ TournamentParticipateComponent ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: TournamentService, useValue: tournamentSpy},
        { provide: TeamService, useValue: teamSpy},
        { provide: AuthService, useValue: authSpy},
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
    fixture = TestBed.createComponent(TournamentParticipateComponent);
    component = fixture.componentInstance;
    tournamentService = TestBed.get(TournamentService);
    tournamentService.getTournamentById.and.returnValue(of(mockTournament));
    tournamentService.updateTournament.and.returnValue(of(null));
    teamService = TestBed.get(TeamService);
    authService = TestBed.get(AuthService);
    authService.getUser.and.returnValue(of(mockUser));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get tournament and user at ngOnInit', async(() => {
    tournamentService.getTournamentById.and.returnValue(of(mockTournament));
    authService.getUser.and.returnValue(of(mockUser));
    component.leaderId = 1;
    component.ngOnInit();
    expect(component.tournament).toEqual(mockTournament);
    expect(tournamentService.getTournamentById).toHaveBeenCalled();
    expect(authService.getUser).toHaveBeenCalled();
  }));

  it('should not register team when user not type team name', () => {
    component.name = '';
    expect(component.name.trim().length).toEqual(0);
    component.registerTeam();
  });

  it('should not register team when user click cancle of confirm message', () => {
    component.name = 'team1name';
    const string = 'Your team name: ' + component.name + '\n' + 'Is it correct?';
    const check = false;
    expect(check).toEqual(false);
    spyOn(window, 'confirm');
    component.registerTeam();
    expect(window.confirm).toHaveBeenCalledWith(string);
  });

  it('should not register team when the tournament has alreay started', async(() => {
    component.name = 'team1name';
    const string = 'Your team name: ' + component.name + '\n' + 'Is it correct?';
    const check = true;
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    const alertString = 'Tournament has already started!';
    component.id = 1;
    tournamentService.getTournamentById.and.returnValue(of(mockTournament));
    component.registerTeam();
    fixture.detectChanges();
    expect(check).toEqual(true);
    expect(window.confirm).toHaveBeenCalled();
    expect(component.tournament.state).not.toEqual(2);
    expect(window.alert).toHaveBeenCalled();
  }));
});
