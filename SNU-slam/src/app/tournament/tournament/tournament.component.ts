import { Component, OnInit } from '@angular/core';

import { Tournament } from '../../tournament';
import { TournamentService } from '../tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  tournaments: Tournament[];

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

  acceptTournament(tournament:Tournament): void{
    tournament.state = 2;
    this.tournamentService.updateTournament(tournament).subscribe();
  }

  deleteTournament(tournament:Tournament): void{
    this.tournaments = this.tournaments.filter(t => t!==tournament);
    this.tournamentService.deleteTournament(tournament).subscribe();
  }
  

  

}

