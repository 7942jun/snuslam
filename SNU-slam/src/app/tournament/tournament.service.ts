import { Injectable } from '@angular/core';
import { Tournament } from '../tournament';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  baseUrl = environment.API_URL;
  private tournamentsUrl = this.baseUrl + '/api/tournament';

  constructor(
    private http: HttpClient,
  ) { }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }

  updateTournament(tournament: Tournament): Observable<any> {
    return this.http.put(this.tournamentsUrl, tournament, httpOptions);
  }

  deleteTournament(tournament: Tournament): Observable<Tournament> {
    const url = `${this.tournamentsUrl}/${tournament.id}`;
    return this.http.delete<Tournament>(url, httpOptions);
  }

  addTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(this.tournamentsUrl, tournament, httpOptions);
  }

  getTournamentById(id: number): Observable<Tournament> {
    const url = `${this.tournamentsUrl}/${id}`;
    return this.http.get<Tournament>(url);
  }

}
