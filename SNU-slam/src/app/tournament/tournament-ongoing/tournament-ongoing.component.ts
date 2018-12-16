import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../../tournament';
import { Team } from '../../team';
import { TournamentService } from '../tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-tournament-ongoing',
  templateUrl: './tournament-ongoing.component.html',
  styleUrls: ['./tournament-ongoing.component.css']
})
export class TournamentOngoingComponent implements OnInit {
  tournament: Tournament;
  teams: Team[] = [];
  leaderName: string[] = [];

  constructor(
    private tournamentService: TournamentService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private userService: UserService,

  ) { }

  ngOnInit() {
      this.getTournament();
      this.getLeaderName();
      // this.getTeams();
  }

  getTournament(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tournamentService.getTournamentById(id)
      .subscribe(tournament => {
                  this.tournament = tournament;
                  for (let i = 0; i < tournament.teams.length; i++) {
                    this.teamService.getTeamById(tournament.teams[i])
                      .subscribe(team => {
                        this.teams.push(team);
                      });
                  }
                  });
  }
  getLeaderName(){
    for(var i = 0; i<this.teams.length; i++){
      this.userService.getUserById(this.teams[i].leader_id)
        .subscribe(user =>{
          this.leaderName.push(user.username);
        })
    }
  }
  /*
  getTeams(): void {
    for (let i = 0; i < this.tournament.teams.length; i++) {
      this.teamService.getTeamById(this.tournament.teams[i])
        .subscribe(team => {
          this.teams.push(team);
        });
    }
  }
  */

  updateColor(): void {
    for (let i = 0; i < 4; i++) {
      if ( this.tournament.result1[i] != -1) {
        const id = 'r1' + this.tournament.result1[i];
        document.getElementById(id).style.backgroundColor = 'red';
      }
    }

    for (let i = 0; i < 2; i++) {
      if ( this.tournament.result2[i] != -1) {
        const temp = Math.floor((this.tournament.result2[i] - 1) / 2) + 1;
        const id = 'r2' + temp;
        document.getElementById(id).style.backgroundColor = 'red';
      }
    }

    if ( this.tournament.result3[0] != -1) {
      const temp = Math.floor((this.tournament.result3[0] - 1) / 4) + 1;
      const id = 'r3' + temp;
      const id2 = 'r4';
      document.getElementById(id).style.backgroundColor = 'red';
      document.getElementById(id2).style.backgroundColor = 'red';
    }
  }

  result1(team: number, id: string): void {
    const temp = Math.floor((team - 1) / 2);
    if (this.tournament.result1[temp] == -1 ) {
      const check = confirm('Team ' + team + ' won the game. Is it true?');
      if (check) {
        this.tournament.result1[temp] = team;
        this.tournamentService.updateTournament(this.tournament)
        .subscribe();
        document.getElementById(id).style.backgroundColor = 'red';
      }
    }
  }

  result2(team: number, id: string): void {
    if (team == -1) {
      return;
    }
    else {
      const temp = Math.floor((team - 1) / 4);
      if (this.tournament.result2[temp] == -1) {
        const check = confirm('Team ' + team + ' won the game. Is it true?');
        if (check) {
          this.tournament.result2[temp] = team;
          this.tournamentService.updateTournament(this.tournament)
        .subscribe();
        document.getElementById(id).style.backgroundColor = 'red';
        }
      }
    }
  }

  result3(team: number, id: string): void {
    if (team == -1) {
      return;
    }
    else {
      if (this.tournament.result3[0] == -1) {
        const check = confirm('Team ' + team + ' won the game. Is it true?');
        if (check) {
          this.tournament.result3[0] = team;
          this.tournament.state = 4; // 종료
          this.tournamentService.updateTournament(this.tournament)
            .subscribe();
          document.getElementById(id).style.backgroundColor = 'red';
          document.getElementById('r4').style.backgroundColor = 'red';
        }
      }
    }
  }

  quarterFinals(nth: number): string {
    if (nth == 0) {
      return this.tournament.result1[0] == -1 ? '' : 'Team ' + this.tournament.result1[0];
    }
    else if (nth == 1) {
      return this.tournament.result1[1] == -1 ? '' : 'Team ' + this.tournament.result1[1];
    }
    else if (nth == 2) {
      return this.tournament.result1[2] == -1 ? '' : 'Team ' + this.tournament.result1[2];
    }
    else {
      return this.tournament.result1[3] == -1 ? '' : 'Team ' + this.tournament.result1[3];
    }
  }

  semiFinals(nth: number): string {
    if (nth == 0) {
      return this.tournament.result2[0] == -1 ? '' : 'Team ' + this.tournament.result2[0];
    }
    else {
      return this.tournament.result2[1] == -1 ? '' : 'Team ' + this.tournament.result2[1];
    }
  }

  final(): string {
    return this.tournament.result3[0] == -1 ? '' : 'Team ' + this.tournament.result3[0];
  }
}
