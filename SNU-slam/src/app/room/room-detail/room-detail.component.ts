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
    this.room = { id: 5, title: 'room_5', host_id: 5, guests_id: [], location: 'nat', play_time: 120, creation_time: new Date("2015-04-25"), game_type: 3}
  }
  onChangeTeam(){

  }

}
