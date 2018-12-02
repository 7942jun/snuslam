import { TestBed, inject, async } from '@angular/core/testing';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Team } from '../team';

import { TeamService } from './team.service';

const mockTeam: Team = {id: 1, name: 'team1name', leader_id: 1,
  members_id: [],  tournament_id: 1};

describe('TeamService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let teamService: TeamService;
  const teamsUrl = 'api/team';

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [TeamService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    teamService = TestBed.get(TeamService);
  });

  it('should be created', inject([TeamService], (service: TeamService) => {
    expect(service).toBeTruthy();
  }));

  it('should add team with post request', async(() => {
    teamService.addTeam(mockTeam).subscribe(
      data => {expect(data).toEqual(mockTeam); }
    );
    const req = httpTestingController.expectOne(teamsUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockTeam);
  }));

  it('should get team of certain id with get request', async(() => {
    teamService.getTeamById(1).subscribe(
      data => {expect(data).toEqual(mockTeam); }
    );
  }));

});
