import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Room } from '../../room';
import { User } from '../../user';
import { RoomDetailComponent } from './room-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../room.service';
import { Component , Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({selector: 'app-teamlist', template: ''})
export class MockTeamlistComponent {
  @Input()
  play_time: number;
  @Input()
  redteam: User[];
  @Input()
  blueteam: User[];
  @Input()
  isStarted: boolean;
  @Output()
  changeteam: EventEmitter<void> = new EventEmitter();
}

describe('RoomDetailComponent', () => {
  let component: RoomDetailComponent;
  let fixture: ComponentFixture<RoomDetailComponent>;
  let roomService: jasmine.SpyObj<RoomService>;
  let authService: jasmine.SpyObj<AuthService>;
  beforeEach(async(() => {
    const roomSpy = jasmine.createSpyObj('RoomService', ['getAllRoom']);
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
        { provide: RoomService, useValue: }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
