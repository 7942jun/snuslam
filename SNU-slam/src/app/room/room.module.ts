import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoollistComponent } from './roollist/roollist.component';
import { RoompageComponent } from './roompage/roompage.component';
import { RoomRoutingModule } from './room-routing.module';
import { RoomcreateComponent } from './roomcreate/roomcreate.component';
import { FormsModule } from '@angular/forms';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { TeamlistComponent } from './teamlist/teamlist.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RoomRoutingModule,
  
  ],
  declarations: [
    RoollistComponent,
    RoompageComponent,
    RoomcreateComponent,
    RoomDetailComponent,
    TeamlistComponent
  ],
  exports: [
    TeamlistComponent
  ]
})
export class RoomModule { }
