import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.checkLogin()) {
      this.router.navigate(['/']);
      alert('Please sign in');
      return false;
    }

    this.router.navigate(['/room']);
    return true;

  }

  checkLogin(): boolean {
    return this.userService.isLoggedIn;
  }

}
