import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room/room.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  rooms: Room[];

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getAllRoom().subscribe(rooms => this.rooms = rooms);
  }

}
