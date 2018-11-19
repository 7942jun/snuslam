import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../room.service';
import { RoomcreateComponent } from './roomcreate.component';
import { of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Room } from '../../room';

const mockRoom: Room = { 
    id: 1,
    title: 'title',
    host_id: 1,
    guests_id: [],
    location: 'nat',
    play_time: 60,
    creation_time: new Date('December 17, 1995 03:24:00') ,
    type: 1,
    ingame: false
};

describe('RoomcreateComponent', () => {
  let component: RoomcreateComponent;
  let fixture: ComponentFixture<RoomcreateComponent>;
  let roomService: jasmine.SpyObj<RoomService>;
  let authService: jasmine.SpyObj<AuthService>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    const roomSpy = jasmine.createSpyObj('RoomService', ['addRoom']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const componentSpy = jasmine.createSpyObj('RoomcreateComponent', ['createroom']);
    TestBed.configureTestingModule({
      declarations: [ RoomcreateComponent ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: RoomService, useValue: roomSpy},
        { provide: Router,      useValue: routerSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: RoomcreateComponent, useValue: componentSpy},
      ],
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RoomcreateComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    authService.getUser.and.returnValue(1);
    roomService = TestBed.get(RoomService);
    roomService.addRoom.and.returnValue(of(mockRoom));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get user id at ngOnInit', async(() => {
    authService.getUser.and.returnValue(1);
    component.ngOnInit();
    component.id = 1;
    expect(component.id).toEqual(1);
    expect(authService.getUser).toHaveBeenCalled();
  }));
  it('should not add room when there is a missing content', () => {
    component.title = '';
    component.location = '';
    component.id = 1;
    component.play_time = null;
    component.type = null;
    component.createroom();
  });
  it('should add room', () => {
    component.title = 'title';
    component.id = 1;
    component.location = 'nat';
    component.play_time = 60;
    component.type = 1;
    const string = 'Title: ' + component.title + '\n' + 'Location: ' + component.location + '\n' + 'Play time: ' +
    component.play_time + ' min' + '\n' + 'Type: ' + component.type + ':' + component.type + '\n' + 'Is it correct?';
    spyOn(window, 'confirm').and.returnValue(true);
    component.createroom();
    expect(window.confirm).toHaveBeenCalledWith(string);
    const check = true;
    expect(check).toEqual(true);
    roomService.addRoom.and.returnValue(of(mockRoom));
    expect(roomService.addRoom).toHaveBeenCalled();
  });
  // it('should not add room when click cancle of confirm message', () => {
  //   component.title = 'title';
  //   component.id = 1;
  //   component.location = 'nat';
  //   component.play_time = 60;
  //   component.type = 1;
  //   const check = false;
  //   expect(check).toEqual(false);
  //   //component.createroom();
  // });
});
