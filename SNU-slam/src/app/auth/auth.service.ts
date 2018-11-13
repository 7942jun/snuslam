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
  isLoggedIn = false;
  current_user: User;

  redirectUrl: string;

  constructor(private http: HttpClient) { }

  // login(username: string, password: string) {
  //   return this.http.post<any>(`/api/sign_in/`, { username: username, password: password }, httpOptions)
  //     .pipe(map(user => {
  //       if (user && user.token) {
  //         this.isLoggedIn = true;
  //         this.current_user = user;
  //         console.log(this.current_user);
  //       }
  //     }));
  // }

  // mock login
  login(): Observable<User> {
    this.isLoggedIn = true;
    this.current_user =  { id: 1, email: 'swpp1@snu.ac.kr', password: '11', username : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000, team: 2 };
    const url = 'api/user/1';
    return this.http.get<User>(url);

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
