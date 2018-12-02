import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { UserService } from "../services/user.service";
import { SignUpComponent } from './sign-up.component';
import { FormsModule } from "@angular/forms";
import { User } from "../user";
import { of } from "rxjs";

const mockUserList: User[] = [
  { id: 1, email: 'iluvswpp@snu.ac.kr', password: 'q1w2e3r4', username: 'Nicolas', position: 'C',
    wins: 12, loses: 5, teams_id: [1, 2, 5], point: 1984, team: 1 },
  { id: 2, email: 'swpp@hate.ac.kr', password: 'sosleepy', username: 'OMG', position: 'SG',
    wins: 7, loses: 21, teams_id: [5], point: 1402, team: 2 }
];

const mockUser: User = { id: 3, email: 'zzz@sss.ccc.er', password: 'inthemorning', username: 'David', position: null,
    wins: null, loses: null, teams_id: null, point: null, team: 0 };

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let location: jasmine.SpyObj<Location>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    const location = jasmine.createSpyObj('Location', ['back']);
    const userSpy = jasmine.createSpyObj('UserService',
      ['postUser', 'getUsers', 'getUserById', 'searchUsers' ]);
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SignUpComponent ],
      providers: [ { provide: Location , useValue: location },
        { provide: UserService, useValue: userSpy } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.get(Location);
    userService = TestBed.get(UserService);
    userService.postUser.and.returnValue(of(mockUser));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should post new user', () => {
    const mockUserListChanged: User[] = [...mockUserList];
    mockUserListChanged.push(mockUser);
    userService.postUser.and.returnValue(of(mockUserList))
    spyOn(window, 'alert');
    component.signUp();
    expect(window.alert).toHaveBeenCalledWith("enter information");
    component.newUser.username = 'David';
    component.newUser.password = 'inthemorning';
    component.pw_confirm = '';
    component.newUser.email = 'zzz@sss.ccc.er';
    component.signUp();
    fixture.detectChanges();
    expect(component.pw_confirm).toBe('');
    component.newUser.password = 'inthemorning';
    component.pw_confirm = 'inthemorning';
    component.signUp();
  });

  it('should call goBack', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  })
});
