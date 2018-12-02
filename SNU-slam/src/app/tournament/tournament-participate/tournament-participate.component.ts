import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../tournament';
import { Team } from '../../team';
import { TournamentService } from '../tournament.service';
import { TeamService } from '../team.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tournament-participate',
  templateUrl: './tournament-participate.component.html',
  styleUrls: ['./tournament-participate.component.css']
})
export class TournamentParticipateComponent implements OnInit {
  tournament: Tournament;
  name;
  leaderId;
  team: Team;
  id;
  constructor(
    private tournamentService: TournamentService,
    private teamService: TeamService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getTournament();
    this.leaderId = this.authService.getUser();
  }

  getTournament(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.tournamentService.getTournamentById(this.id)
      .subscribe(tournament => {
                  this.tournament = tournament;
                  });
  }

  registerTeam(): void {
    if (this.name.trim().length == 0) {
      return;
    }
    const check = confirm('Your team name: ' + this.name + '\n' + 'Is it correct?');

    if (check) {
      this.tournamentService.getTournamentById(this.id)
      .subscribe(tournament => {
                  this.tournament = tournament;
                  });
      if (this.tournament.state != 2) {
        alert('Tournament has already started!');
        this.router.navigateByUrl(`tournament`);
      }
      else {
        this.teamService.addTeam(
          {name: this.name, leader_id: this.leaderId, members_id: []} as Team)
            .subscribe(team => {
            this.tournament.teams.push(team.id);
            if (this.tournament.teams.length == 8) {
              this.tournament.state = 3;
            }
            this.tournamentService.updateTournament(this.tournament).subscribe();
            this.router.navigateByUrl(`tournament`);
          });
      }
    }
  }

}
