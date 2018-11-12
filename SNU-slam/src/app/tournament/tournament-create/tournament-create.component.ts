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

  title = '';
  prize = '';
  game_type3 = false;
  game_type5 = false;
  total_team4 = false;
  total_team8 = false;
  game_type = this.game_type3 == true ? 3 : 5;
  total_team = this.total_team4 == true ? 4 : 8;
  teams: number[];
  result: number[];

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

  checkTitle(): boolean {
    let temp;
    temp = this.title.trim();
    if (temp.length == 0 || temp.length  > 30) {
      return true;
    }
    else {
      return false;
    }
  }

  checkPrize(): boolean {
    let temp;
    temp = this.prize.trim();
    if (temp.length == 0 || temp.length  > 30) {
      return true;
    }
    else {
      return false;
    }
  }

  checkGameType(): boolean {
    if ((this.game_type3 == false && this.game_type5 == false) ||
        (this.game_type3 == true && this.game_type5 == true)) {
          return true;
    }
    else {
      return false;
    }
  }

  checkTotalTeams(): boolean {
    if ((this.total_team4 == false && this.total_team8 == false) ||
        (this.total_team4 == true && this.total_team8 == true)) {
          return true;
    }
    else {
      return false;
    }
  }

  addTournament(): void {
    this.tournamentService.addTournament(
      { title: this.title.trim(), host: 1, teams: this.teams, game_type: this.game_type,
        total_team: this.total_team, result: this.result, reward: this.prize.trim(), state: 1} as Tournament)
      .subscribe(tournament => {
        this.tournaments.push(tournament);
        this.router.navigateByUrl(`tournament`);
      });
  }
}
