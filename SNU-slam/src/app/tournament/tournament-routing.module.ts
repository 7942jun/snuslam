import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TournamentComponent } from './tournament/tournament.component';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { TournamentOngoingComponent } from './tournament-ongoing/tournament-ongoing.component';
import { TournamentParticipateComponent } from './tournament-participate/tournament-participate.component';


const tournamentRoutes: Routes = [
  { path: 'tournament', component: TournamentComponent},
  { path: 'tournament/create', component: TournamentCreateComponent},
  { path: 'tournament/ongoing/:id', component: TournamentOngoingComponent},
  { path: 'tournament/participate/:id', component: TournamentParticipateComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(tournamentRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TournamentRoutingModule { }
