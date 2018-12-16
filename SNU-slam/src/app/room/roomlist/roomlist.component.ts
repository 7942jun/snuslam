import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {

  roomlist: Room[];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.roomService.getAllRoom().subscribe(
      (rooms) => {
        this.roomlist = rooms;
      }
    );
  }
}
