import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../tournament';

import { TournamentService } from './tournament.service';

const mockTournamentList: Tournament[]= [
  {id: 1, title: 'test1', host: 1, teams: [1,2,3,4], game_type: 3, 
    max_team:4, result: [1,2,3,4], reward: 'test1', state: 1}
]
const mockTournament : Tournament = {id: 1, title: 'test1', host: 1, teams: [1,2,3,4], game_type: 3, 
max_team:4, result: [1,2,3,4], reward: 'test1', state: 1};
//state of tournament. 1: 승인 중, 2: 신청 중, 3: 진행 중, 4: 종료


describe('TournamentService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let tournamentService: TournamentService;
  const tournamentsUrl = 'api/tournaments/';

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [TournamentService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    tournamentService = TestBed.get(TournamentService);
  });

  it('should be created', inject([TournamentService], (service:TournamentService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should get all tournaments with get request', async(()=>{
    tournamentService.getTournaments().subscribe(
      data => {expect(data).toEqual(mockTournamentList);}
    )
    const req = httpTestingController.expectOne(tournamentsUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTournamentList);
  }))

  it('should update tournament with put request', async(()=>{
    tournamentService.updateTournament(mockTournament).subscribe();
    const req = httpTestingController.expectOne(tournamentsUrl);
    expect(req.request.method).toEqual('PUT');
    req.flush({});
  }))

  it('should delete tournament with delete request', async(()=>{
    const tournamentId = mockTournament.id;
    const url = `${tournamentsUrl}/${tournamentId}`;
    tournamentService.deleteTournament(mockTournament).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  }))
  
});
