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
  type: number;

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
  createroom() {
    if (this.title.trim().length == 0 || this.location.trim().length == 0 ||
      this.play_time == null || this.type == null) {
      return;
    }

    const check = confirm('Title: ' + this.title + '\n' + 'Location: ' + this.location + '\n' + 'Play time: ' +
      this.play_time + ' min' + '\n' + 'Type: ' + this.type + ':' + this.type + '\n' + 'Is it correct?');

    const newroom = {
      title: this.title,
      host_id: this.id,
      guests_id: [],
      location: this.location,
      play_time: this.play_time,
      type: this.type
    };
    if (check) {
      this.roomService.addRoom( newroom as Room ).subscribe(
        room => this.router.navigate([`room/${room.id}`])
      );
    }

  }
}
