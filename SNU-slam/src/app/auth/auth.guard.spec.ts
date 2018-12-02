import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [AuthGuard,
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy } ]
    });
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should activate', () => {
    authGuard = new AuthGuard(authService, router);
    // expect(authGuard.canActivate()).toBeFalsy();
    authService.isLoggedIn = true;
    authGuard = new AuthGuard(authService, router);
    // expect(authGuard.canActivate()).toBeTruthy();
  });

});
