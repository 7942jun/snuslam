import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/sign_in/`, { username: username, password: password }, httpOptions)
      .pipe(map(user => {
        if (user && user.token) {
          this.isLoggedIn = true;
        }
      }));
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
