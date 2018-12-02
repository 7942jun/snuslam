import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

const user =  { id: 1, email: 'swpp1@snu.ac.kr', password: '11', username : 'user_1', position: 'c', wins: 2, loses: 3, teams_id: [1], point: 1000, team: 2 };

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login', () => {
    authService.login();
    expect(authService.current_user.email).toBe('swpp1@snu.ac.kr');
    expect(authService.isLoggedIn).toBeTruthy();
  });

  it('should logout', () => {
    expect(authService.isLoggedIn).toBeFalsy();
    authService.login();
    expect(authService.isLoggedIn).toBeTruthy();
    authService.logout();
    expect(authService.isLoggedIn).toBeFalsy();
  });

  it('should get current user', () => {
    let getuser = authService.getUser();
    expect(getuser).toBeUndefined();
    authService.login();
    getuser = authService.getUser();
    expect(getuser).toEqual(user);
  })

});
