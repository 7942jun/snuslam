import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.css']
})
export class IngameComponent implements OnChanges {
  @Input()
  isStarted: boolean;

  @Input()
  play_time: number;

  time = new Date();


  constructor(

  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // for ( let propname in changes) {
    //   if ( propname === 'isStarted') {
    if (changes['isStarted']) {
      this.time.setMinutes(this.time.getMinutes() + this.play_time);


    }
  }
}


// (zeroTrigger)="yourOwnFunction($event)"
