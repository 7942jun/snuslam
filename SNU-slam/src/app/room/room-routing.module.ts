import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { RoompageComponent } from './roompage/roompage.component';
import { RoomcreateComponent} from './roomcreate/roomcreate.component';
import { RoomDetailComponent} from './room-detail/room-detail.component';
import { AuthGuard } from '../auth/auth.guard';
import { IngameComponent } from './ingame/ingame.component';
import { StartComponent } from './start/start.component';

const roomRoutes: Routes = [
  { path: 'room', component: RoompageComponent, canActivate: [AuthGuard] },
  { path: 'room/create', component: RoomcreateComponent , canActivate: [AuthGuard]},
  { path: 'room/:id', component: RoomDetailComponent, canActivate: [AuthGuard]},
  { path: 'start/:id', component: StartComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(roomRoutes),

  ],
  exports: [
    RouterModule
  ]
})
export class RoomRoutingModule { }
