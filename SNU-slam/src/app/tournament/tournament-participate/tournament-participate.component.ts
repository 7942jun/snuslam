import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../tournament';
import { Team } from '../../team';
import { TournamentService } from '../tournament.service';
import { TeamService } from '../team.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tournament-participate',
  templateUrl: './tournament-participate.component.html',
  styleUrls: ['./tournament-participate.component.css']
})
export class TournamentParticipateComponent implements OnInit {
  tournament: Tournament;
  name;
  contact;
  leaderId;
  team: Team;
  id;
  constructor(
    private tournamentService: TournamentService,
    private teamService: TeamService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getTournament();
    this.leaderId = this.userService.getUser().id;
  }

  getTournament(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.tournamentService.getTournamentById(this.id)
      .subscribe(tournament => {
                  this.tournament = tournament;
                  });
  }

  registerTeam(): void {
    for(var i = 0; i<this.tournament.teams.length; i++){
      if(this.tournament.teamLeaders[i] == this.leaderId){
        alert('You have already participated!');
        return;
      }
    }
    if (this.name.trim().length == 0 || this.contact.trim().length == 0) {
      alert('Enter all information');
      return;
    }
    const check = confirm('Your team name: ' + this.name + '\n' +
                          'Your contact information: ' + this.contact + '\n'+
                          'Is it correct?');

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
          {name: this.name, contact: this.contact, leader_id: this.leaderId, members_id: []} as Team)
            .subscribe(team => {
            this.tournament.teams.push(team.id);
            this.tournament.teamLeaders.push(team.leader_id);
            if (this.tournament.teams.length == 8) {
              this.tournament.state = 3;
            }
            this.tournamentService.updateTournament(this.tournament)
              .subscribe(tournament => {
                this.router.navigateByUrl(`tournament`);
              });
            
          });
      }
    }
  }

}
