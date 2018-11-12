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
    this.roomService.getUser().subscribe(
      (user) => {
        this.user = user;
      }
    );
    this.getUserlist();

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
