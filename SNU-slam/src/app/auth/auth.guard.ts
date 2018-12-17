import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private userId: number;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    const seg = url.split('/');


    if (!this.checkLogin()) {
      this.router.navigate(['/']);
      alert('Please sign in');
      return of(false);
    }


    if ( seg[1] == 'room' ) {
      if (seg.length == 2) {
        return of(true);
      }

      else if (seg[2] == 'create' ) {
        return this.authService.isuserinRoom(this.userId).pipe(
          map(res => {
            if (res.length != 0) {
              alert(`You are already in room ${res[0].id}`);
              this.router.navigate([`room/${res[0].id}`]);
              return false;
            }
            else {
              return true;
            }
          })
        );
      }
      else if ( /^\d+$/.test(seg[2]) ) {
        const roomid = parseInt(seg[2], 10);
        return this.authService.roomauth(roomid, this.userId).pipe(
          map(res => {
            if (Number.isInteger(res)) {
              if (res == -1) {
                alert(`Room ${roomid} does not exists!`);
                return false;
              }
              alert(`You are already in room ${res}`);
              this.router.navigate([`room/${res}`]);
              return false;
            }
            else if (res == true) {
              return true;
            }
            else {
              if ( 2 * res.type == res.guests.length + 1) {
                alert(`Room is Full!`);
                return false;
              }
              return true;
            }
          })
        );
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
      else if (seg[2] == 'ongoing' || seg[2] == 'participate' ) {
        if (/^\d+$/.test(seg[3])) {
          return this.checktorunament(Number(seg[3])).pipe(
            map(res =>
                {return res}
              )
          );

        }
      }
    }
    else if (seg[1] == 'start') {
      return true;
    }

  }



  checkLogin(): boolean {
    if (this.userService.isLoggedIn) {
      this.userId = this.userService.current_user.id;
      return true;
    }
    return false;
  }

  checktorunament(id: number): Observable<boolean> {
    return this.authService.istournamentExist(id)
    .pipe(
      map(res => {
        return res;
      })
    );
  }
  checkongoing(id: number): boolean {
    return true;
  }
  isroom(roomid: number): Observable<boolean> {
    return this.authService.isroomExist(roomid)
    .pipe(
      map(res => {
        return res;
      })
    );
  }

}
