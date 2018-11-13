import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from "@angular/common";
import { UserService } from "../services/user.service";
import { RankComponent } from './rank.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from "../user";
import { of } from "rxjs";

const mockUserList: User[] = [
  { id: 1, email: 'iluvswpp@snu.ac.kr', password: 'q1w2e3r4', username: 'Nicolas', position: 'C',
    wins: 12, loses: 5, teams_id: [1, 2, 5], point: 1984, team: 1 },
  { id: 2, email: 'swpp@hate.ac.kr', password: 'sosleepy', username: 'OMG', position: 'SG',
    wins: 7, loses: 21, teams_id: [5], point: 1402, team: 0 }
];

const mockSearchedUserList: User[] = [
  { id: 3, email: 'sogae@won.sil', password: 'oyeah', username: 'OLNL', position: 'PG',
    wins: 62, loses: 54, teams_id: [], point: 2653, team: 1 },
  { id: 5, email: 'its@time.to.sleep', password: 'swag', username: 'GENIOUS', position: 'SG',
    wins: 16, loses: 19, teams_id: [1, 4], point: 1690, team: 2 }
];

describe('RankComponent', () => {
  let component: RankComponent;
  let fixture: ComponentFixture<RankComponent>;
  let location: jasmine.SpyObj<Location>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    const rankComponent = jasmine.createSpyObj('RankComponent',
      [ 'getUsers', 'search', 'goBack' ]);
    const userSpy = jasmine.createSpyObj('UserService',
      ['postUser', 'getUsers', 'getUserById', 'searchUsers' ]);
    const location = jasmine.createSpyObj('Location', ['back']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ RankComponent ],
      providers: [ { provide: Location, useValue: location },
        { provide: UserService, useValue: userSpy },
        { provide: RankComponent, useValue: rankComponent }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankComponent);
    component = fixture.componentInstance;
    component.users = mockUserList;
    component.searched_users = mockSearchedUserList;
    userService = TestBed.get(UserService);
    userService.getUsers.and.returnValue(of(mockUserList));
    userService.searchUsers.and.returnValue(of(mockSearchedUserList));
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search', () => {
    component.search('O');
    expect(component.searched_users).toEqual(mockSearchedUserList);
  });

  it('should call goBack', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  })
});
