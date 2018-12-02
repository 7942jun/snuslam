import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable, of } from 'rxjs';
<<<<<<< HEAD
import { map } from 'rxjs/operators';
=======
import { map } from "rxjs/operators";
>>>>>>> 1ad610184a96c89998029b2e426b733e81f0ce2b

const httpOptions = {
  headers: this.getCSRFHeaders()
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
        this.current_user = user;
        this.isLoggedIn = true;
        this.token = user['token'];
      }));c

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
