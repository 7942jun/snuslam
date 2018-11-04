import { Component, OnInit } from '@angular/core';


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
  creation_time: Date;
  game_type: number;

  constructor() { }

  ngOnInit() {
  }
  create(){
    
  }

}
