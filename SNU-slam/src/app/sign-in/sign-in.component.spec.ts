import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let signInComponent: jasmine.SpyObj<SignInComponent>;
  let router: jasmine.SpyObj<Router>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router',
      [ 'navigate' ]);
    const userSpy = jasmine.createSpyObj('UserService',
      ['login']);
    const modalSpy = jasmine.createSpyObj('NgbModal',
      ['open']);
    const signInSpy = jasmine.createSpyObj('SIgnInComponent',
      ['sign_in']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers: [
        { provide: SignInComponent, useValue: signInSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userSpy },
        { provide: NgbModal, useValue: modalSpy },
        { provide: Location, useValue: locationSpy }
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
    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sign_in', () => {
    signInComponent.sign_in();
    expect(signInComponent.sign_in).toHaveBeenCalled();
  });

  it('should call goBack', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

});
