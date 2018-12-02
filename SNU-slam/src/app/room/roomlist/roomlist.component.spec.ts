import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomlistComponent } from './roomlist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Room } from '../../room';


const mockRoomList: Room[] = [
  { id: 1,
    title: 'test1',
    host: 1,
    guests_id: [2, 3, 4],
    location: '301',
    play_time: 60,
    creation_time: new Date('December 17, 1995 03:24:00') ,
    type: 3,
    ingame: true
  }
];


describe('RoomlistComponent', () => {
  let component: RoomlistComponent;
  let fixture: ComponentFixture<RoomlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ RoomlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomlistComponent);
    component = fixture.componentInstance;
    component.roomlist = mockRoomList;
    fixture.detectChanges();
  });

  it('should create', async(() => {
    fixture = TestBed.createComponent(RoomlistComponent);
    component = fixture.componentInstance;
    component.roomlist = mockRoomList;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
