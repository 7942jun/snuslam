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
    private tournamentService: TournamentService
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
          observer.next(true); // your server response
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
}
