import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user';
import { StartService } from '../start.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  user: User;
  redTeam: User[];
  blueTeam: User[];
  host: number;
  chooseTeam: boolean;
  winTeam: string;

  constructor(
    private startService: StartService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.chooseTeam = false;
    this.user = this.userService.getUser();
    this.redTeam = this.startService.getRedTeam();
    this.blueTeam = this.startService.getBlueTeam();
    this.host = this.startService.getRoomHost();
  }

  redWin() {
    this.chooseTeam = true;
    this.winTeam = "Team Red";
    this.redTeam.forEach(user => {
      this.userService.updateUserWinsById(user.id, true).subscribe();
    });
    this.blueTeam.forEach(user => {
      this.userService.updateUserWinsById(user.id, false).subscribe();
    });
  }

  blueWin() {
    this.chooseTeam = true;
    this.winTeam = "Team Blue";
    this.redTeam.forEach(user => {
      this.userService.updateUserWinsById(user.id, false).subscribe();
    });
    this.blueTeam.forEach(user => {
      this.userService.updateUserWinsById(user.id, true).subscribe();
    });
  }

  exit() {
    this.router.navigate(['/room']);
  }
}
