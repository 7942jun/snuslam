import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../user';
import { Room } from '../../room';
import { RoomService } from '../room.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  user: User;
  room: Room;
  users: User[];
  redteam: User[];
  blueteam: User[];
  play_time: number;
  host_id: number;
  isStarted: boolean;


  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getRoom();
    this.getUserlist();

  }
  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomById(id).subscribe(
      room => {
        this.room = room;
        this.host_id = room.host_id;
        this.isStarted = room.ingame;
        this.play_time = room.play_time;
      }
    );
  }
  getUserlist(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomUserById(id).subscribe(
      users => {
        this.users = users;
        this.redteam  = users.filter( user => user.team === 1);
        this.blueteam = users.filter( user => user.team === 2);
        this.onChangeTeam();
      }
    );
  }

  refresh(): void {
    this.getRoom();
    this.getUserlist();
  }


  onChangeTeam() {
    if (this.user.team !== 0) {
      if (this.user.team === 1) {
        this.user.team = 2;
      } else {
        this.user.team = 1;
      }
    } else {
      if ( this.redteam.length > this.blueteam.length ) {
        this.user.team = 2;
      } else {
        this.user.team = 1;
      }
    }

    this.roomService.changeTeam(this.user).subscribe(
      () => {}
    );
  }

  start() {
    if ( this.redteam.length === this.blueteam.length ) {
      const newroom = this.room;
      newroom.ingame = true;
      this.roomService.updateRoom(newroom).subscribe(
        () => {}
      );
    } else {
      alert( 'Numbers of people in the two teams is not equal!');
    }
  }

  goBack() {
    if (this.room.guests_id.length > 0) {
      const newroom = this.room;
      if (this.user.id === this.host_id) {
        newroom.host_id = newroom.guests_id.shift();
      } else {
        newroom.guests_id = newroom.guests_id.filter( id => id !== this.user.id );
      }
      this.roomService.updateRoom( newroom ).subscribe(
        () => this.router.navigate(['/room'])
      );
    }
    else {
    this.roomService.deleteRoomById(this.room.id).subscribe(
      () => this.router.navigate(['/room'])
      );
    }
  }


}
