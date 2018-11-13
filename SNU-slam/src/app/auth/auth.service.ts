import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  current_user: User;

  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/sign_in/`, { username: username, password: password }, httpOptions)
      .pipe(map(user => {
        if (user && user.token) {
          this.isLoggedIn = true;
          this.current_user = user;
        }
      }));
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  getUser(): User {
    if ( this.isLoggedIn) {
      return this.current_user;
    } else {
      return;
    }

  }

}
