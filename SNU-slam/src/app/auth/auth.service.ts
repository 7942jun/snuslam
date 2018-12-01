import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authurl = '/api/user/';
  isLoggedIn = false;
  public current_user: User =  { id: 1, email: 'swpp1@snu.ac.kr', password: '11', username : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [0], point: 1000, team: 2 };

  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login() {
    const user = { id: 1, email: 'swpp1@snu.ac.kr', password: '11', username : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000, team: 2 };
    this.isLoggedIn = true;
    this.current_user = user;
  }
  getCSRFCookie(): string {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const splitted = cookie.trim().split('=');
      if (splitted[0] == 'csrftoken' ) {
        return splitted[1];
      }
    });
    return '';
  }
  getToken(): Observable<string> {
    const url = `${this.authurl}token`;
    return this.http.get<string>(url);
  }

  // mock login
  // login(): Observable<User> {
  //   this.isLoggedIn = true;
  //   this.current_user =  { id: 1, email: 'swpp1@snu.ac.kr', password: '11', username : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000, team: 2 };
  //   const url = 'api/user/1';
  //   return this.http.get<User>(url);

  // }

  logout(): void {
    this.isLoggedIn = false;
  }

  getUser(): User {
    //if ( this.isLoggedIn ) {
      return this.current_user;
    //} else {
    //  return;
    //}

  }

}
