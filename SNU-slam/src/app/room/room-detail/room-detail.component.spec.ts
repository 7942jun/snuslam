import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Room } from '../../room';
import { User } from '../../user';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomDetailComponent } from './room-detail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../room.service';
import { Component , Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { convertToParamMap} from '@angular/router';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { UserService } from "../../services/user.service";

const mockRoom: Room =  { id: 1, title: 'room_0', host: 1, guests_id: [2, 3, 4], location: 'eng' , play_time: 60, creation_time: new Date("2015-03-25") , type: 2, ingame: false };

const mockUserList: User[] = [
 { id: 1, email: 'swpp1@snu.ac.kr', password: '11', username : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000, team: 2 },
 { id: 2, email: 'swpp2@snu.ac.kr', password: '11', username : 'user_2', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000, team: 1 }
];
const mockUser: User = { id: 1, email: 'swpp1@snu.ac.kr', password: '11', username : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000, team: 2 };
@Component({selector: 'app-teamlist', template: ''})
export class MockTeamlistComponent {
  @Input()
  isHost: boolean;
  @Input()
  play_time: number;
  @Input()
  redteam: User[];
  @Input()
  blueteam: User[];
  @Input()
  isStarted: boolean;
  // @Output()
  // changeteam: EventEmitter<any> = new EventEmitter();
  @Output()
  isFinished: EventEmitter<any> = new EventEmitter();
}

describe('RoomDetailComponent', () => {
  let component: RoomDetailComponent;
  let fixture: ComponentFixture<RoomDetailComponent>;
  let roomService: jasmine.SpyObj<RoomService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    const roomSpy = jasmine.createSpyObj('RoomService', ['deleteRoomById', 'updateRoom', 'changeTeam', 'getRoomUserById', 'getRoomById']);
    const userSpy = jasmine.createSpyObj('UserService', ['getUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    TestBed.configureTestingModule({
      declarations: [
        RoomDetailComponent,
        MockTeamlistComponent
       ],
       imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: UserService, useValue: userSpy },
        { provide: RoomService, useValue: roomSpy},
        { provide: Router,      useValue: routerSpy },
        { provide: ActivatedRoute,       useValue: {
          snapshot: {
            paramMap: convertToParamMap({
              id: '1'
            })
          }
        } },
      ]
    })
    .compileComponents();
    // fixture = TestBed.createComponent(RoomDetailComponent);
    // component = fixture.componentInstance;
    // userService = TestBed.get(UserService);
    // userService.getUser.and.returnValue(1);
    // roomService = TestBed.get(RoomService);
    // roomService.getRoomById.and.returnValue(of(mockRoom));
    // roomService.getRoomUserById.and.returnValue(of(mockUserList));
    // fixture.detectChanges();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    userService.getUser.and.returnValue(of(mockUser));
    roomService = TestBed.get(RoomService);
    roomService.getRoomById.and.returnValue(of(mockRoom));
    roomService.getRoomUserById.and.returnValue(of(mockUserList));
    fixture.detectChanges();
  });

  // it('should create', async(() => {
  //   expect(component).toBeTruthy();
  // }));
  it('should retrive rooms and user at ngOnInit', async(() => {
    expect(component).toBeTruthy();
    // userService.getUser.and.returnValue(of);
    // roomService.getRoomById.and.returnValue(of(mockRoom));
    // roomService.getRoomUserById.and.returnValue(of(mockUserList));
    component.ngOnInit();
    expect(component.room).toEqual(mockRoom);
    expect(component.users).toEqual(mockUserList);
    expect(roomService.getRoomById).toHaveBeenCalled();
    expect(roomService.getRoomUserById).toHaveBeenCalled();
    expect(userService.getUser).toHaveBeenCalled();
    //component.start();
    //component.onChangeTeam(any);
    component.refreshUserlist();
    //component.onFinished(mockUserList);
    component.goBack();
  }));
});
