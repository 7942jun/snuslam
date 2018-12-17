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
    this.getCSRFHeaders();
    return this.http.get<Tournament[]>(this.tournamentsUrl);
  }

  updateTournament(tournament: Tournament): Observable<any> {
    this.getCSRFHeaders();
    return this.http.put(this.tournamentsUrl, tournament, httpOptions);
  }

  deleteTournament(tournament: Tournament): Observable<Tournament> {
    this.getCSRFHeaders();
    const url = `${this.tournamentsUrl}/${tournament.id}`;
    return this.http.delete<Tournament>(url, httpOptions);
  }

  addTournament(tournament: Tournament): Observable<Tournament> {
    this.getCSRFHeaders();
    return this.http.post<Tournament>(this.tournamentsUrl, tournament, httpOptions);
  }

  getTournamentById(id: number): Observable<Tournament> {
    this.getCSRFHeaders();
    const url = `${this.tournamentsUrl}/${id}`;
    return this.http.get<Tournament>(url);
  }

  getCSRFHeaders(): void {
    let token = '';
    if (document.cookie) {
      token = document.cookie.split('csrftoken=')[1].split(';')[0];
    }
    localStorage.setItem('csrf', token);
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': token
    });
  }

}
