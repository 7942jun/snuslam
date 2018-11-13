import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.css']
})
export class TeamlistComponent implements OnInit {
  @Input()
  play_time: number;
  @Input()
  redteam: User[];
  @Input()
  blueteam: User[];
  @Input()
  isStarted: boolean;
  @Output()
  changeteam: EventEmitter<void> = new EventEmitter();
  constructor() {}


  ngOnInit() {
  }

  change() {
    this.changeteam.emit();
  }
}
