import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { RoomService } from "../room/room.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from "rxjs";
import { RoomModule } from "../room/room.module";
import { SignInComponent } from "../sign-in/sign-in.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../services/user.service";

const mockRoomList = [
  { id: 0, title: 'room_0', host_id: 1, guests_id: [2, 3, 4], location: 'eng' , play_time: 60, creation_time: new Date("2015-03-25") , type: 2, ingame: false },
  { id: 5, title: 'room_5', host_id: 5, guests_id: [], location: 'nat', play_time: 120, creation_time: new Date("2015-04-25"), type: 3, ingame: false}
];

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let roomService: jasmine.SpyObj<RoomService>;

  beforeEach(async(() => {
    const roomSpy = jasmine.createSpyObj('RoomService',
      ['getAllRoom']);
    const routerSpy = jasmine.createSpyObj('Router',
      [ 'navigate' ]);
    const userSpy = jasmine.createSpyObj('UserService',
      ['login']);
    const modalSpy = jasmine.createSpyObj('NgbModal',
      ['open']);
    const signInSpy = jasmine.createSpyObj('SIgnInComponent',
      ['sign_in']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RoomModule, FormsModule, ReactiveFormsModule ],
      declarations: [ MainComponent, SignInComponent ],
      providers: [
        { provide: RoomService, useValue: roomSpy },
        { provide: SignInComponent, useValue: signInSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userSpy },
        { provide: NgbModal, useValue: modalSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    roomService = TestBed.get(RoomService);
    roomService.getAllRoom.and.returnValue(of(mockRoomList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all rooms', () => {
    component.ngOnInit();
    expect(component.rooms).toEqual(mockRoomList);
    expect(roomService.getAllRoom).toHaveBeenCalled();
  })

});
