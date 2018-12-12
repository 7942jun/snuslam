import { Component, OnInit } from '@angular/core';

import { Tournament } from '../../tournament';
import { TournamentService } from '../tournament.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournaments: Tournament[] = [];
  user:User = null;
  
  constructor(
    private tournamentService: TournamentService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getTournaments();
    this.user = this.userService.getUser()
    
    
  }

  getTournaments(): void {
    this.tournamentService.getTournaments()
      .subscribe(tournaments => this.tournaments = tournaments);
  }

  acceptTournament(tournament: Tournament): void {
    if(!this.isAdmin()){
      return;
    }
    tournament.state = 2;
    this.tournamentService.updateTournament(tournament).subscribe();
  }

  deleteTournament(tournament: Tournament): void {
    if(!this.isAdmin()){
      return;
    }
    this.tournaments = this.tournaments.filter(t => t !== tournament);
    this.tournamentService.deleteTournament(tournament).subscribe();
  }

  state(state: number): string {
    // state of tournament. 1: 승인 중, 2: 신청 중, 3: 진행 중, 4: 종료
    if (state == 1) {
      return '승인 중';
    }
    else if (state == 2) {
      return '신청 중';
    }
    else if (state == 3) {
      return '진행 중';
    }
    else if (state == 4) {
      return '종료';
    }
  }

  isAdmin(): boolean{
    return this.user != null && this.user.email=='kimwj94@snu.ac.kr'&&this.user.username=='woojung';
  }

}

