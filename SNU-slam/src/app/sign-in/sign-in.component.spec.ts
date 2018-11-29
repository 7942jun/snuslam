import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let signInComponent: jasmine.SpyObj<SignInComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router',
      [ 'navigate' ]);
    const authSpy = jasmine.createSpyObj('AuthService',
      ['login']);
    const modalSpy = jasmine.createSpyObj('NgbModal',
      ['open']);
    const signInSpy = jasmine.createSpyObj('SIgnInComponent',
      ['sign_in']);

    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers: [
        { provide: SignInComponent, useValue: signInSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: NgbModal, useValue: modalSpy }
      ],
      imports: [ ReactiveFormsModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    signInComponent = TestBed.get(SignInComponent);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sign_in', () => {
    signInComponent.sign_in();
    expect(signInComponent.sign_in).toHaveBeenCalled();
  })

  it('should call navigate', () => {
    component.sign_in();
    expect(router.navigate).toHaveBeenCalled();
  })

});
