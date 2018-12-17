import { UserService } from 'src/app/services/user.service';
import { User } from '../user'
import { TournamentService } from './../tournament/tournament.service';
 import { Injectable } from '@angular/core';
 import { Observable, of } from 'rxjs';
 import { RoomService } from './../room/room.service';
 @Injectable({
  providedIn: 'root'
})
export class AuthService {
   constructor(
    private roomService: RoomService,
    private tournamentService: TournamentService,
    private userService: UserService
  ) {}
  isuserinRoom(userid: number): Observable<any> {
    return Observable.create((observer => {
      this.roomService.getuserroom(userid).subscribe((rooms) => {
          observer.next(rooms);
        }
      );
    }
    ));
  }
  isroomExist(roomid: number): Observable<any> {
    return Observable.create((observer) => {
      this.roomService.getRoomById(roomid)
        .subscribe((room) => {
          observer.next(room); // your server response
        }, (err) => {
          observer.next(false);
        });
    });
  }
  istournamentExist(tourid: number): Observable<any> {
    return Observable.create((observer) => {
      this.tournamentService.getTournamentById(tourid)
      .subscribe((tourn) => {
        observer.next(true);
      }, (err) => {
        observer.next(false);

      });
    });
  }
  isLoggedIn(): Observable<any> {
    const id = parseInt(localStorage.getItem('user_id'), 10);
    if (id == null) {
      return Observable.create((observer) => {
        this.userService.logout()
        .subscribe((user) => {
          observer.next(false);
        }, (err) => {
          observer.next(false);
        });
      });
    }
    else {
      return of(true);

    }

  }
}
