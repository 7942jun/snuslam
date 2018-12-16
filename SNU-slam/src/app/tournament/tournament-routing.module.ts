import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { TournamentComponent } from './tournament/tournament.component';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { TournamentOngoingComponent } from './tournament-ongoing/tournament-ongoing.component';
import { TournamentParticipateComponent } from './tournament-participate/tournament-participate.component';


const tournamentRoutes: Routes = [
  { path: 'tournament', component: TournamentComponent, canActivate: [AuthGuard]},
  { path: 'tournament/create', component: TournamentCreateComponent , canActivate: [AuthGuard]},
  { path: 'tournament/ongoing/:id', component: TournamentOngoingComponent , canActivate: [AuthGuard]},
  { path: 'tournament/participate/:id', component: TournamentParticipateComponent , canActivate: [AuthGuard]},
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
