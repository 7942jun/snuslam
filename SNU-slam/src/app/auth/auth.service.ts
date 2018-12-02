import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  current_user: User;
  private token: string;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/api/sign_in', { email: email, password: password }, httpOptions)
      .pipe(map(user => {
        if (user && user.token) {
          this.current_user = JSON.parse(user);
          this.isLoggedIn = true;
          this.token = user['token'];
        }
      }));
  }

  logout(): void {
    this.isLoggedIn = false;
    this.current_user = undefined;
    this.token = '';
  }

  getUser(): User {
    if ( this.isLoggedIn ) {
      return this.current_user;
    } else {
      return;
    }
  }

}
