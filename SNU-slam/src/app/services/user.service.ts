import {Injectable, Output} from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap , map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean;
  current_user: User;
  baseUrl = environment.API_URL;

  private userUrl = this.baseUrl + '/api/user';
  private signUrl = this.baseUrl + '/api/sign_in';
  private signOutUrl = this.baseUrl + '/api/sign_out';
  private tokenUrl =  this.baseUrl + '/api/token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
      if (!JSON.parse(sessionStorage.getItem('sessionUser'))) {
        this.isLoggedIn = false;
        this.current_user = null;
      } else {
        this.isLoggedIn = true;
        this.current_user = JSON.parse(sessionStorage.getItem('sessionUser')) as User;
      }
  }

  updateUserWinsById(id: number, win: boolean, mypoint: number, yourpoint: number): Observable<void> {
    const url = `${this.userUrl}/wins/${id}`;
    const data = (win) ? JSON.stringify({win: 1, lose: 0,mypoint: mypoint, yourpoint: yourpoint}) : JSON.stringify({win:0, lose:1, mypoint: mypoint, yourpoint: yourpoint});
    return this.http.put<void>(url, data, httpOptions);
  }

  postUser(user: User): Observable<User> {
    this.getCSRFHeaders();
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(catchError(this.handleError<User>('postUser')));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(tap(_ => this.log('fetched users')),
        catchError(this.handleError('getUsers', [])));
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUser id=${id}`)));
  }

  login(email: string, password: string): Observable<User> {
    this.getCSRFHeaders();
    const data = JSON.stringify({ email: email, password: password });
    return this.http.post<User>(this.signUrl, data, httpOptions)
  }

  getCSRFHeaders(): HttpHeaders {
    let token = '';
    if (document.cookie) {
      token = document.cookie.split('csrftoken=')[1].split(';')[0];
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': token
    });
  }
  getCSRFToken(): Observable<void> {
    return this.http.get<void>(this.tokenUrl, httpOptions);
  }

  logout(): Observable<User> {
    this.isLoggedIn = false;
    this.current_user = undefined;
    sessionStorage.clear();
    return this.http.get<User>(this.signOutUrl);
  }

  getUser(): User {
    if ( this.current_user ) {
      return this.current_user;
    } else {
      return;
    }
  }

  private log(message: string) {
    console.log(`UserService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return Promise.resolve(result as T);
    };
  }



}
