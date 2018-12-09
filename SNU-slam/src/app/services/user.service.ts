import {Injectable, Output} from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn: boolean;
  current_user: User;

  private userUrl = '/api/user';
  private signUrl = '/api/sign_in';
  private signOutUrl = 'api/sign_out';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  postUser(user: User): Observable<User> {
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

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.userUrl}/?nickname=${term}`)
      .pipe(tap(_ => this.log(`found users matching "${term}"`)),
        catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  login(email: string, password: string): Observable<User> {
    const data = JSON.stringify({ email: email, password: password });
    return this.http.post<User>(this.signUrl, data, httpOptions);
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

  logout(): Observable<User> {
    this.isLoggedIn = false;
    this.current_user = undefined;
    return this.http.get<User>(this.signOutUrl);
  }

  getUser(): User {
    if ( this.isLoggedIn ) {
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
