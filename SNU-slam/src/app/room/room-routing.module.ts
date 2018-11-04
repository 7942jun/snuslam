import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { RoompageComponent } from './roompage/roompage.component';
import { RoomcreateComponent} from './roomcreate/roomcreate.component'
import { RoomDetailComponent} from './room-detail/room-detail.component'
const roomRoutes: Routes = [
  { path: 'room', component: RoompageComponent},
  { path: 'room/create', component: RoomcreateComponent},
  { path: 'room/detail/:id', component: RoomDetailComponent}

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
