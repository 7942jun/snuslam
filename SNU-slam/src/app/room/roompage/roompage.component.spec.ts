import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Room } from '../../room';
import { RoompageComponent } from './roompage.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../room.service';
import { Component, Input, Output } from '@angular/core';
import { of } from 'rxjs';

@Component({selector: 'app-roomlist', template: ''})
export class MockRoomlistComponent {
  @Input()
  roomlist: Room[];
}
const mockRoomList: Room[] = [
    { id: 1,
      title: 'test1',
      host_id: 1,
      guests_id: [2, 3, 4],
      location: '301',
      play_time: 60,
      creation_time: new Date('December 17, 1995 03:24:00') ,
      type: 3,
      ingame: true
    }
];

describe('RoompageComponent', () => {
  let component: RoompageComponent;
  let fixture: ComponentFixture<RoompageComponent>;
  let roomService: jasmine.SpyObj<RoomService>;

  beforeEach(async(() => {
    const roomSpy = jasmine.createSpyObj('RoomService', ['getAllRoom']);
    TestBed.configureTestingModule({
      declarations: [
        RoompageComponent,
        MockRoomlistComponent
        ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: RoomService, useValue: roomSpy},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoompageComponent);
    component = fixture.componentInstance;
    roomService = TestBed.get(RoomService);
    roomService.getAllRoom.and.returnValue(of(mockRoomList));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get roomlist at ngOnInit', async(() => {
    roomService.getAllRoom.and.returnValue(of(mockRoomList));
    component.ngOnInit();
    expect(component.roomlist).toEqual(mockRoomList);
    expect(roomService.getAllRoom).toHaveBeenCalled();
  }));
  it('should alert when clicked', async(() => {
    component.court1();
    component.court2();
    component.court3();
  }));
});
