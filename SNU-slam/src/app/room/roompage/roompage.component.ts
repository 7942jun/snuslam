import { Component, OnInit } from '@angular/core';
import { Room } from '../../room';


@Component({
  selector: 'app-roompage',
  templateUrl: './roompage.component.html',
  styleUrls: ['./roompage.component.css']
})
export class RoompageComponent implements OnInit {
  roomlist: Room[];
  
  constructor() { }

  ngOnInit() {
  }

}
