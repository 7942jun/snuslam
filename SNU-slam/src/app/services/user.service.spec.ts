import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { User } from '../user';
import { Router } from "@angular/router";

const mockUserList: User[] = [
  { id: 1, email: 'iluvswpp@snu.ac.kr', password: 'q1w2e3r4', username: 'Nicolas', position: 'C',
    wins: 12, loses: 5, teams_id: [1, 2, 5], point: 1984, team: 1 },
  { id: 2, email: 'swpp@hate.ac.kr', password: 'sosleepy', username: 'OMG', position: 'SG',
    wins: 7, loses: 21, teams_id: [5], point: 1402, team: 2 }
];

const mockUser: User = { id: 3, email: 'idont@like.swpp', password: 'passmetheball', username: 'NULL', position: 'SF',
  wins: 53, loses: 21, teams_id: [3, 4], point: 2130, team: 0 }

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  const userApi = '/api/user';

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const httpSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: 'API_URL', useValue: userApi },
        { provide: Router, useValue: routerSpy }]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should post new user', async(() => {
    userService.postUser(mockUser).subscribe(data => {
        expect(data).toEqual(mockUser);
    });
    const req = httpTestingController.expectOne(userApi);
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
  }));

  it('should get all users', async ( () => {
    userService.getUsers().subscribe( data => {
      expect(data).toEqual(mockUserList);
    });
    const req = httpTestingController.expectOne(userApi);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUserList);
  }));

  it('should get specific user with id', async( () => {
    const id = mockUser.id;
    const url = `${userApi}${id}/`;
    userService.getUserById(id).subscribe( data => {
      expect(data).toEqual(mockUser);
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  }));

  it('should search users by nickname', async (() => {
    userService.searchUsers('').subscribe(data => {
      expect(data).toEqual([]);
    });
    const username = mockUser.username;
    userService.searchUsers(username).subscribe( data => {
      expect(data).toEqual([mockUser]);
    });
  }));

  it('should return empty list', async( () => {
    userService.getUsers().subscribe( data => {
      expect(data).toEqual([]);
    });
    httpTestingController.expectOne(userApi).flush(null,
      {status: 401, statusText: 'Unauthorized'});
  }));

});
