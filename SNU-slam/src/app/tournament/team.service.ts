import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Team } from '../team';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  baseUrl = environment.API_URL;
  private teamsUrl = this.baseUrl + '/api/team';

  constructor(
    private http: HttpClient,
  ) { }

  addTeam(team: Team): Observable<Team> {
    this.getCSRFHeaders();
    return this.http.post<Team>(this.teamsUrl, team, httpOptions);
  }

  getTeamById(id: number): Observable<Team> {
    this.getCSRFHeaders();
    const url = `${this.teamsUrl}/${id}`;
    return this.http.get<Team>(url);
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
