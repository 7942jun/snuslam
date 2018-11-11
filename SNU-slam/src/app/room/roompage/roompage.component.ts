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

  court1() {
    alert("기숙사 운동장\n코트 2개\n샤워장 있음");
  }

  court2() {
    alert("대운동장\n코트 2개\n샤워장 없음");
  }

  court3() {
    alert("301동 주차장\n코트4개\n샤워장 없음");
  }

}
