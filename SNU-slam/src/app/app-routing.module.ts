import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from "./sign-up/sign-up.component";
import { MainComponent } from "./main/main.component";
import { RankComponent } from "./rank/rank.component";
import { RoompageComponent } from "./room/roompage/roompage.component";
import { TournamentComponent } from "./tournament/tournament/tournament.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'sign_up', component: SignUpComponent },
  { path: 'rank', component: RankComponent },
  { path: 'room', component: RoompageComponent },
  { path: 'tournament', component: TournamentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
