import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user'

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.css']
})
export class TeamlistComponent implements OnInit {
  @Input()
  redteam: User[];
  @Input()
  blueteam: User[];
  @Output()
  changeteam: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


}
