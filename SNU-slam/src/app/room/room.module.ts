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
import { IngameComponent } from './ingame/ingame.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';
import { MapComponent } from './map/map.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChatComponent } from './chat/chat.component';
import { ListComponent } from './list/list.component';
import { StartComponent } from './start/start.component';

@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    RoomRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    CountdownTimerModule.forRoot()
  ],
  declarations: [
    RoomlistComponent,
    RoompageComponent,
    RoomcreateComponent,
    RoomDetailComponent,
    TeamlistComponent,
    IngameComponent,
    MapComponent,
    ChatComponent,
    ListComponent,
    StartComponent
  ],
  exports: [
    MapComponent
  ]
})
export class RoomModule { }
