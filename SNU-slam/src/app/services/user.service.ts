import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';

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

  getUserById(id: number): Observable<User> {
    const url = `${this.userUrl}${id}/`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUser id=${id}`)));
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
