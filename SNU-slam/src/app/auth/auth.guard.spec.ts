// import { TestBed, async, inject } from '@angular/core/testing';
// import { AuthGuard } from './auth.guard';
// import { Router } from '@angular/router';
// import { HttpClientTestingModule } from '@angular/common/http/testing';

// describe('AuthGuard', () => {
//   let authGuard: AuthGuard;
//   let router: Router;
//   beforeEach(() => {
//     const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     TestBed.configureTestingModule({
//       imports: [ HttpClientTestingModule ],
//       providers: [AuthGuard,
//         { provide: Router, useValue: routerSpy } ]
//     });
//     router = TestBed.get(Router);
//   });

//   it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
//     expect(guard).toBeTruthy();
//   }));

//   it('should activate', () => {
//     authGuard = new AuthGuard(router);
//     // expect(authGuard.canActivate()).toBeFalsy();
//     authService.isLoggedIn = true;
//     authGuard = new AuthGuard(router);
//     // expect(authGuard.canActivate()).toBeTruthy();
//   });

// });
