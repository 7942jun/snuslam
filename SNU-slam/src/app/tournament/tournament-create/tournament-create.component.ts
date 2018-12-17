import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../tournament';
import { TournamentService } from '../tournament.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css']
})
export class TournamentCreateComponent implements OnInit {

  tournaments: Tournament[];

  title: string = '';
  prize: string = '';
  game_type: number;
  total_team: number;
  teams: number[];

  check: boolean;

  constructor(
    private tournamentService: TournamentService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getTournaments();
    this.userService.getCSRFToken();
    

  }
  
  getTournaments(): void {
    this.tournamentService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

  addTournament(): void {
    if (this.title.trim().length == 0 || this.prize.trim().length == 0 ||
      this.game_type == null || this.total_team == null) {
      alert('Enter all information.');
      return;
    }

    const check = confirm('Title: ' + this.title + '\n' + 'Type: ' + this.game_type + ':' + this.game_type + '\n'
      + 'Total Teams: ' + this.total_team + ' teams' + '\n' + 'Prize: ' + this.prize + '\n' + 'Is it correct?');

    if (check) {
      if(this.title.length >100 || this.prize.length > 100){
        alert('Title and Prize should be under 100 letters');
        return;
      }
      this.tournamentService.addTournament(
        { title: this.title.trim(), host: 1, teams: [], game_type: this.game_type,
          total_team: this.total_team, reward: this.prize.trim(), state: 1 } as Tournament)
        .subscribe(tournament => {
          this.tournaments.push(tournament);
          this.router.navigateByUrl(`tournament`);
        });
    }
  }
}
