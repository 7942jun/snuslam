import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TournamentComponent } from './tournament/tournament.component';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';


const tournamentRoutes: Routes = [
  { path: 'tournament', component: TournamentComponent},
  { path: 'tournament/create', component: TournamentCreateComponent},
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
