import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { MainComponent } from './main.component';
import { AuthService } from "../auth/auth.service";
import { RoomService } from "../room/room.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from "rxjs";

const mockRoomList = [
  { id: 0, title: 'room_0', host_id: 1, guests_id: [2, 3, 4], location: 'eng' , play_time: 60, creation_time: new Date("2015-03-25") , type: 2, ingame: false },
  { id: 5, title: 'room_5', host_id: 5, guests_id: [], location: 'nat', play_time: 120, creation_time: new Date("2015-04-25"), type: 3, ingame: false}
];

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mainComponent: jasmine.SpyObj<MainComponent>;
  let roomService: jasmine.SpyObj<RoomService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const mainSpy = jasmine.createSpyObj('MainComponent',
      [ 'court1', 'court2', 'court3', 'sign_in' ]);
    const routerSpy = jasmine.createSpyObj('Router',
      [ 'navigate' ]);
    const authSpy = jasmine.createSpyObj('AuthService',
      ['login']);
    const roomSpy = jasmine.createSpyObj('RoomService',
      ['getAllRoom']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MainComponent ],
      providers: [ { provide: Router, useValue: routerSpy },
        { provide: MainComponent, useValue: mainSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: RoomService, useValue: roomSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    mainComponent = TestBed.get(MainComponent);
    mainComponent.sign_in();
    roomService = TestBed.get(RoomService);
    roomService.getAllRoom.and.returnValue(of(mockRoomList));
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sign_in', () =>{
    component.sign_in();
    expect(mainComponent.sign_in).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
  })

});
