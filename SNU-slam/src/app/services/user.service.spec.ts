import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';
import { User } from '../user';

const mockUserList: User[] = [
  { id: 1, email: 'iluvswpp@snu.ac.kr', password: 'q1w2e3r4', nickname: 'Nicolas', position: 'C',
    wins: 12, loses: 5, teams_id: [1, 2, 5], point: 1984 },
  { id: 2, email: 'swpp@hate.ac.kr', password: 'sosleepy', nickname: 'OMG', position: 'SG',
    wins: 7, loses: 21, teams_id: [5], point: 1402 }
];

const mockUser: User = { id: 3, email: 'idont@like.swpp', password: 'passmetheball', nickname: 'NULL', position: 'SF',
  wins: 53, loses: 21, teams_id: [3, 4], point: 2130 }

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  const userApi = '/api/user/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
