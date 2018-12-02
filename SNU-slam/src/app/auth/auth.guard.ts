import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    const seg = url.split('/');
    console.log('1');

    if (!this.checkLogin()) {
      console.log('2');
      this.router.navigate(['/']);
      alert('Please sign in');
      return true;
    }


    if ( seg[1] == 'room' ) {
      if (seg.length == 2) {
        return true;
      }
      else if (seg[2] == 'create' ) {
        return true;
      }
      else if ( /^\d+$/.test(seg[2]) ) {
        return this.checkRoom(Number(seg[2]));
      }
    }


    else if ( seg[1] == 'rank' ) {
      return true;
    }
    else if ( seg[1] == 'tournament') {
      if (seg.length == 2) {
        return true;
      }
      else if (seg[2] == 'create') {
        return true;
      }
      else if (seg[2] == 'ongoing' ) {
        if (/^\d+$/.test(seg[3])) {
          return this.checkongoing(Number(seg[3]));

        }
      }
      else if ( seg[2] == 'participate' ) {
        if ( /^\d+$/.test(seg[3])) {
          return this.checktorunament(Number(seg[3]));
        }
      }
    }
    alert('Bad url!');
    this.router.navigate(['/']);
    return false;

  }



  checkLogin(): boolean {
    if (this.userService.isLoggedIn) {
      return true;
    }
    return true;
  }
  checkRoom(id: number): boolean {
    //if (this.authService.isInRoom()) {}
    return true;
  }
  checktorunament(id: number): boolean {
    return true;
  }
  checkongoing(id: number): boolean {
    return true;
  }

}
