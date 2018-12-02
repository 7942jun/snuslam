import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../tournament';
import { TournamentService } from '../tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css']
})
export class TournamentCreateComponent implements OnInit {

  tournaments: Tournament[];

  title: string;
  prize: string;
  game_type: number;
  total_team: number;
  teams: number[];
  result1 = [-1, -1, -1, -1];
  result2 = [-1, -1];
  result3 = [-1];

  check: boolean;

  constructor(
    private tournamentService: TournamentService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments(): void {
    this.tournamentService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

  addTournament(): void {
    if (this.title.trim().length == 0 || this.prize.trim().length == 0 ||
      this.game_type == null || this.total_team == null) {
      return;
    }

    const check = confirm('Title: ' + this.title + '\n' + 'Type: ' + this.game_type + ':' + this.game_type + '\n'
      + 'Total Teams: ' + this.total_team + ' teams' + '\n' + 'Prize: ' + this.prize + '\n' + 'Is it correct?');

    if (check) {
      this.tournamentService.addTournament(
        { title: this.title.trim(), host: 1, teams: this.teams, game_type: this.game_type,
          total_team: this.total_team, result1: this.result1, result2: this.result2,
          result3: this.result3, reward: this.prize.trim(), state: 1 } as Tournament)
        .subscribe(tournament => {
          this.tournaments.push(tournament);
          this.router.navigateByUrl(`tournament`);
        });
    }
  }
}
