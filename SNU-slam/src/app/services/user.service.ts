import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import { User } from "../user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = '/api/user/';

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions)
      .pipe(catchError(this.handleError<User>('addUser')));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', [])));
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.userUrl}${id}/`;
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
    )
  }

  private log(message: string) {
    console.log(`TodoService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Promise<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return Promise.resolve(result as T);
    };
  }

}
