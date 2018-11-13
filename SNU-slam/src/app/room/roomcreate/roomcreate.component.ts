import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../../room';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

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
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.id = this.authservice.getUser().id;
  }
  createroom() {
    const newroom = {
      title: this.title,
      host_id: this.id,
      guests_id: [],
      location: this.location,
      play_time: this.play_time,
      type: this.type
    };
    this.roomService.addRoom( newroom as Room ).subscribe(
      room => this.router.navigate([`room/${room.id}`])
    );
  }
}
