import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { RoompageComponent } from './roompage/roompage.component';
import { RoomcreateComponent} from './roomcreate/roomcreate.component';
import { RoomDetailComponent} from './room-detail/room-detail.component';
import { IngameComponent } from './ingame/ingame.component';
const roomRoutes: Routes = [
  { path: 'room', component: RoompageComponent},
  { path: 'room/create', component: RoomcreateComponent},
  { path: 'room/:id', component: RoomDetailComponent},
  { path: 'room/:id/ingame', component: IngameComponent }
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
