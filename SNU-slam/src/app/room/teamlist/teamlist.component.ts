import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.css']
})
export class TeamlistComponent implements OnInit {
  @Input()
  isHost: boolean;
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
  @Output()
  isFinished: EventEmitter<any> = new EventEmitter();




  constructor(
    private modalService: NgbModal
  ) {}
  ngOnInit() {
  }

  change() {
    this.changeteam.emit();
  }
  endbutton(content) {

    const check = confirm('Do you want to finish the game?');
     if (check) {
      this.modalService.open(content, { centered: true });
       this.end(this.redteam);

    }
  }
  end(team) {
    this.isFinished.emit(team);
  }

}

