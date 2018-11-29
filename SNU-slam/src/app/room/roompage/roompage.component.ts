import { Component, OnInit } from '@angular/core';
import { Room } from '../../room';

import { RoomService } from '../room.service';


@Component({
  selector: 'app-roompage',
  templateUrl: './roompage.component.html',
  styleUrls: ['./roompage.component.css']
})
export class RoompageComponent implements OnInit {
  roomlist: Room[];
  
  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getAllRoom().subscribe(
      (rooms) => {
        this.roomlist = rooms;
      }
    );
  }

}
