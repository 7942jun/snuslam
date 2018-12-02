import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

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
  @Output()
  isDone: EventEmitter<void> = new EventEmitter();


  time = new Date();


  constructor(

  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isStarted']) {
      this.time.setMinutes(this.time.getMinutes() + this.play_time);
    }
  }
  end() {
    this.isDone.emit();
  }
}
