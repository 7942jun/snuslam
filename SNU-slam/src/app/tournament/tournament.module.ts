import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TournamentComponent } from './tournament/tournament.component';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { TournamentParticipateComponent } from './tournament-participate/tournament-participate.component';
import { TournamentOngoingComponent } from './tournament-ongoing/tournament-ongoing.component';
import { TournamentRoutingModule } from './tournament-routing.module';

@NgModule({
  declarations: [TournamentComponent, TournamentCreateComponent, TournamentParticipateComponent, TournamentOngoingComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }
