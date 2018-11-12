import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Room } from '../../room';
import { TeamlistComponent } from "../teamlist/teamlist.component";
import { RoomService } from '../room.service';
import {ActivatedRoute}from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  user: User;
  room: Room;
  redteam: User[];
  blueteam: User[];
  host: User;


  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
  ){}


  ngOnInit() {
<<<<<<< HEAD
    this.roomService.getUser().subscribe(
      (user) => {
        this.user = user;
      }
    );
    this.getUserlist();

=======
    this.room = { id: 5, title: 'room_5', host_id: 5, guests_id: [], location: 'nat', play_time: 120, creation_time: new Date("2015-04-25"), game_type: 3}
>>>>>>> 34e89a156afabeb9041f12072abf56dc5730a829
  }
  getUserlist(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoomById(id).subscribe(
      room => this.room = room
    );
  };


  onChangeTeam(){
  }

}
