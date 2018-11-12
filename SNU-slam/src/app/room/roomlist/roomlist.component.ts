import { Component, OnInit, Input } from '@angular/core';
import {Room } from '../../room';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {
  @Input()
  roomlist: Room[];

  constructor() { }

  ngOnInit() {
  }

}
