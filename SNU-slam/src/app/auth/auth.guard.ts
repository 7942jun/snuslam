import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Tournament } from '../tournament';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    const seg = url.split('/');
    console.log(seg);

    if (!this.checkLogin()) {
      this.router.navigate(['/']);
      alert('Please sign in');
      console.log('1');
      return true;
    }


    if ( seg[1] == 'room' ) {
      if (seg.length == 2) {
        console.log('2');
        return true;
      }
      else if (seg[2] == 'create' ) {
        console.log('3');
        return true;
      }
      else if ( /\d/.test(seg[2]) ) {
        console.log('4');
        return this.checkRoom();
      }
    }

    else if ( seg[1] == 'rank' ) {
      console.log('not');
      return true;
    }
    else if ( seg[1] == 'tournament') {
      console.log('6');
      return true;
    }
    console.log('7');
    alert('Bad url!');
    this.router.navigate(['/']);
    return false;

  }



  checkLogin(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    return true;
  }
  checkRoom(): boolean {
    //if (this.authService.isInRoom()) {}
    return true;
  }

}
