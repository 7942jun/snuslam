import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../../room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roomcreate',
  templateUrl: './roomcreate.component.html',
  styleUrls: ['./roomcreate.component.css']
})
export class RoomcreateComponent implements OnInit {
  id: number;
  title: string;
  location: string;
  play_time: number;
  creation_time: Date;
  game_type: number;

  constructor(
    private roomService: RoomService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.roomService.getUser().subscribe(
      (user) => {
        this.id = user.id;
      }
    );
  }
  createroom(){
    const newroom = {
      title: this.title,
      host_id: this.id,
      guests_id: [],
      location: this.location,
      play_time: this.play_time,
      game_type: this.game_type
    };
    this.roomService.addRoom( newroom as Room ).subscribe(
      room => this.router.navigate([`room/${room.id}`])
    );
  }
}
