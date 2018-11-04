import { Component, OnInit, Input } from '@angular/core';
import {Room } from '../../room';

@Component({
  selector: 'app-roollist',
  templateUrl: './roollist.component.html',
  styleUrls: ['./roollist.component.css']
})
export class RoollistComponent implements OnInit {
  @Input()
  roomlist : Room[];

  constructor() { }

  ngOnInit() {
  }

}
