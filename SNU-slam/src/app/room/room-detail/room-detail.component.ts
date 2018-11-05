import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Room } from '../../room';
import { TeamlistComponent } from "../teamlist/teamlist.component";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room;
  redteam: User[];
  blueteam: User[];
  host: User;


  constructor() { }

  ngOnInit() {
  }
  onChangeTeam(){

  }

}
