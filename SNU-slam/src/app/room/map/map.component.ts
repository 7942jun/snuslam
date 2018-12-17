import { Room } from './../../room';
import { RoomService } from './../room.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  room_ki: Room[];
  room_de: Room[];
  room_301: Room[];

  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
    this.roomService.getAllRoom().subscribe(
      rooms => {
        this.room_ki = rooms.filter( room => room.location == '기숙사');
        this.room_de = rooms.filter( room => room.location == '대운동장');
        this.room_301 = rooms.filter( room => room.location == '주차장');
      }
    );

  }

}
