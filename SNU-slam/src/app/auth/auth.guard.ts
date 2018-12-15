import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Tournament } from '../tournament';
import { TournamentService } from '../tournament/tournament.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService, 
    private router: Router,
    private tournamentService: TournamentService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    const seg = url.split('/');
    console.log('1');

    if (!this.checkLogin()) {
      console.log('2');
      this.router.navigate(['/']);
      alert('Please sign in');
      return false;
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
      else if (seg[2] == 'create' && seg.length==3) {
        return true;
      }
      else if (seg[2] == 'ongoing' && seg.length==4) {
        if (/^\d+$/.test(seg[3])) {
          this.checkTournamentOngoing(Number(seg[3]));

        }
      }
      else if ( seg[2] == 'participate' && seg.length==4) {
        if ( /^\d+$/.test(seg[3])) {
          this.checkTournamentParticipate(Number(seg[3]));
        }
      }
    }
    alert('Bad url!');
    this.router.navigate(['/']);
    return false;

  }



  checkLogin(): boolean {
    console.log(this.userService.isLoggedIn);
    if (this.userService.isLoggedIn) {
      return true;
    }
    return false;
  }
  checkRoom(id: number): boolean {
    //if (this.authService.isInRoom()) {}
    return true;
  }
  checkTournamentOngoing(id: number){
    
    this.tournamentService.getTournamentById(id)
      .subscribe(tournament => {
        if(tournament.id == id && (tournament.state == 3 || tournament.state == 4)){
          return true;
        }
      });
  }
  checkTournamentParticipate(id: number){
    this.tournamentService.getTournamentById(id)
      .subscribe(tournament => {
        if(tournament.id == id && tournament.state == 2){
          return true;
        }
      });
  }

}
