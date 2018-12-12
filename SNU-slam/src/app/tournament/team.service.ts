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
    return this.http.post<Team>(this.teamsUrl, team, httpOptions);
  }

  getTeamById(id: number): Observable<Team> {
    const url = `${this.teamsUrl}/${id}`;
    return this.http.get<Team>(url);
  }
}
