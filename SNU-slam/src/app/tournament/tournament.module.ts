import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { TournamentParticipateComponent } from './tournament-participate/tournament-participate.component';
import { TournamentOngoingComponent } from './tournament-ongoing/tournament-ongoing.component';
import { TournamentRoutingModule } from './tournament-routing.module';

@NgModule({
  declarations: [TournamentComponent, TournamentCreateComponent, TournamentParticipateComponent, TournamentOngoingComponent],
  imports: [
    CommonModule,
    TournamentRoutingModule
  ]
})
export class TournamentModule { }
