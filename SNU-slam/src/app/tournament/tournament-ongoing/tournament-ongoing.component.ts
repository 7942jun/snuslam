import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../../tournament';
import { Team } from '../../team';
import { TournamentService } from '../tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-tournament-ongoing',
  templateUrl: './tournament-ongoing.component.html',
  styleUrls: ['./tournament-ongoing.component.css']
})
export class TournamentOngoingComponent implements OnInit {
  tournament: Tournament;
  teams: Team[] = [null,null,null,null,null,null,null,null];
  leaderName: string[] = [];
  user:User;

  constructor(
    private tournamentService: TournamentService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private userService: UserService,

  ) { }

  ngOnInit() {
      this.getTournament();
      this.user = this.userService.getUser();
      this.showPopup();
      
      // this.getTeams();
  }
  showPopup(){
    var popup = window.open("NOTICE", "MsgWindow", "width=400,height=400");
    popup.document.write('<p style="font-size:40px">After contacting the other team through contact information, '+ 
    'the teams should have a match. The losing team\'s leader clicks on the winning team in the list of matches.</p>');
    popup.document.write('<title>NOTICE</title>');
  }
  getTournament(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tournamentService.getTournamentById(id)
      .subscribe(tournament => {
                  this.tournament = tournament;
                  
                  for (let i = 0; i < tournament.teams.length; i++) {
                    
                    this.teamService.getTeamById(tournament.teams[i])
                      .subscribe(team => {
                        this.teams[i] = team;
                      });
                  }
                  
                  });
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
    if(this.tournament.result11 != -1){
      const id = 'r1'+this.tournament.result11;
      document.getElementById(id).style.backgroundColor = 'red';
    }
    if(this.tournament.result12 != -1){
      const id = 'r1'+this.tournament.result12;
      document.getElementById(id).style.backgroundColor = 'red';
    }
    if(this.tournament.result13 != -1){
      const id = 'r1'+this.tournament.result13;
      document.getElementById(id).style.backgroundColor = 'red';
    }
    if(this.tournament.result14 != -1){
      const id = 'r1'+this.tournament.result14;
      document.getElementById(id).style.backgroundColor = 'red';
    }
    if(this.tournament.result21 != -1){
      const temp = Math.floor((this.tournament.result21 - 1) / 2) + 1;
      const id = 'r2' + temp;
      document.getElementById(id).style.backgroundColor = 'red';
    }
    if(this.tournament.result22 != -1){
      const temp = Math.floor((this.tournament.result22 - 1) / 2) + 1;
      const id = 'r2' + temp;
      document.getElementById(id).style.backgroundColor = 'red';
    }
    if ( this.tournament.result31 != -1) {
      const temp = Math.floor((this.tournament.result31 - 1) / 4) + 1;
      const id = 'r3' + temp;
      const id2 = 'r4';
      document.getElementById(id).style.backgroundColor = 'red';
      document.getElementById(id2).style.backgroundColor = 'red';
    }
  }

  result1(team: number,myTeam:number, id: string): void {
    if(this.teams[myTeam-1].leader_id != this.user.id){
      return;
    }
    const temp = Math.floor((team - 1) / 2) +1;
    if(temp == 1){
      if(this.tournament.result11 == -1){
        const check = confirm('Team ' + team + ' won the game. Is it true?');
        if (check) {
          this.tournament.result11 = team;
          this.tournamentService.updateTournament(this.tournament)
          .subscribe();
          document.getElementById(id).style.backgroundColor = 'red';
        }
      }
    }
    else if(temp == 2){
      if(this.tournament.result12 == -1){
        const check = confirm('Team ' + team + ' won the game. Is it true?');
        if (check) {
          this.tournament.result12 = team;
          this.tournamentService.updateTournament(this.tournament)
          .subscribe();
          document.getElementById(id).style.backgroundColor = 'red';
        }
      }
    }
    else if(temp == 3){
      if(this.tournament.result13 == -1){
        const check = confirm('Team ' + team + ' won the game. Is it true?');
        if (check) {
          this.tournament.result13 = team;
          this.tournamentService.updateTournament(this.tournament)
          .subscribe();
          document.getElementById(id).style.backgroundColor = 'red';
        }
      }
    }
    else{
      if(this.tournament.result14 == -1){
        const check = confirm('Team ' + team + ' won the game. Is it true?');
        if (check) {
          this.tournament.result14 = team;
          this.tournamentService.updateTournament(this.tournament)
          .subscribe();
          document.getElementById(id).style.backgroundColor = 'red';
        }
      }

    }
   
  }

  result2(team: number,myTeam:number, id: string): void {
    if (team == -1 || myTeam == -1) {
      return;
    }
    if(this.teams[myTeam-1].leader_id != this.user.id){
      return;
    }
    else {
      const temp = Math.floor((team - 1) / 4)+1;
      if(temp == 1){
        
        if(this.tournament.result11 == -1 || this.tournament.result12 == -1){
          return;
        }
        if (this.tournament.result21 == -1) {
          const check = confirm('Team ' + team + ' won the game. Is it true?');
          if (check) {
            this.tournament.result21 = team;
            this.tournamentService.updateTournament(this.tournament)
          .subscribe();
          document.getElementById(id).style.backgroundColor = 'red';
          }
        }

      }
      else{
        if(this.tournament.result13 == -1 || this.tournament.result14 == -1){
          return;
        }
        if (this.tournament.result22 == -1) {
          const check = confirm('Team ' + team + ' won the game. Is it true?');
          if (check) {
            this.tournament.result22 = team;
            this.tournamentService.updateTournament(this.tournament)
          .subscribe();
          document.getElementById(id).style.backgroundColor = 'red';
          }
        }

      }
    }
  }

  result3(team: number, myTeam:number, id: string): void {
    
    if (team == -1 || myTeam == -1) {
      return;
    }
    if(this.teams[myTeam-1].leader_id != this.user.id){
      return;
    }
    else {
      if(this.tournament.result21 == -1 || this.tournament.result22 == -1){
        return;
      }
      if (this.tournament.result31 == -1) {
        const check = confirm('Team ' + team + ' won the game. Is it true?');
        if (check) {
          this.tournament.result31 = team;
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
      return this.tournament.result11 == -1 ? '' : 'Team ' + this.tournament.result11;
    }
    else if (nth == 1) {
      return this.tournament.result12 == -1 ? '' : 'Team ' + this.tournament.result12;
    }
    else if (nth == 2) {
      return this.tournament.result13 == -1 ? '' : 'Team ' + this.tournament.result13;
    }
    else {
      return this.tournament.result14 == -1 ? '' : 'Team ' + this.tournament.result14;
    }
  }

  semiFinals(nth: number): string {
    if (nth == 0) {
      return this.tournament.result21 == -1 ? '' : 'Team ' + this.tournament.result21;
    }
    else {
      return this.tournament.result22 == -1 ? '' : 'Team ' + this.tournament.result22;
    }
  }

  final(): string {
    return this.tournament.result31 == -1 ? '' : 'Team ' + this.tournament.result31;
  }
}
