import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { RoompageComponent } from './roompage/roompage.component';
import { RoomRoutingModule } from './room-routing.module';
import { RoomcreateComponent } from './roomcreate/roomcreate.component';
import { FormsModule } from '@angular/forms';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { TeamlistComponent } from './teamlist/teamlist.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RoomRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  
  ],
  declarations: [
    RoomlistComponent,
    RoompageComponent,
    RoomcreateComponent,
    RoomDetailComponent,
    TeamlistComponent
  ]

})
export class RoomModule { }
