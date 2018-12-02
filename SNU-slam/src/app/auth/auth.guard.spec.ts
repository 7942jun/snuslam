import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from "../services/user.service";
import {HttpClient} from "@angular/common/http";

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;
  let userService: UserService;
  let http: HttpClient;
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: Router, useValue: routerSpy },
        UserService
        ]
    });
    router = TestBed.get(Router);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should activate', () => {
    userService = new UserService(http, router);
    authGuard = new AuthGuard(userService, router);
    expect(authGuard.canActivate()).toBeFalsy();
    userService.isLoggedIn = true;
    expect(authGuard.canActivate()).toBeTruthy();
  });

});
