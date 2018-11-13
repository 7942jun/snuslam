import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../user';
import { Room } from '../../room';
import { TeamlistComponent } from '../teamlist/teamlist.component';
import { RoomService } from '../room.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { interval } from 'rxjs';




@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit, OnDestroy {
  user: User;
  room: Room;
  users: User[];
  redteam: User[];
  blueteam: User[];
  source = interval(500);


  host_id: number;
  isStarted: boolean;


  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnDestroy() {

  }
  ngOnInit() {
    this.roomService.getUser().subscribe(
      (user) => {
        this.user = user;
      }
    );
    this.refreshData();

  }
  getRoom(): void {
    console.log('fuck');
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomById(0).subscribe(
      room => {
        this.room = room;
        this.host_id = room.host_id;
        this.isStarted = room.ingame;
      }
    );
  }
  getUserlist(): void {
    console.log('u1');
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomUserById(id).subscribe(
      users => {
        this.users = users;
        this.redteam  = users.filter( user => user.team === 1);
        this.blueteam = users.filter( user => user.team === 2);
      }
    );
  }


  onChangeTeam() {
    if (this.user.team === 1) {
      this.user.team = 2;
    } else {
      this.user.team = 1;
    }

    this.roomService.changeTeam(this.user).subscribe(
      () => {}
    );
  }
  refreshData() {
    this.source.subscribe(val => {
      this.getRoom();
      this.getUserlist();
      this.gamestarted();
    });
  }
  start() {
    const newroom = this.room;
    newroom.ingame = true;
    this.roomService.updateRoom(newroom).subscribe(
      () => {}
    );
  }
  gamestarted() {
    console.log(this.isStarted);
    if (this.isStarted ) {
      this.router.navigate(['/room/create']);
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
