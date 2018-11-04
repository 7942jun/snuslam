import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mainComponent: jasmine.SpyObj<MainComponent>;

  beforeEach(async(() => {
    const mainSpy = jasmine.createSpyObj('MainComponent',
      [ 'court1', 'court2', 'court3', 'sign_in' ]);
    const routerSpy = jasmine.createSpyObj('Router',
      [ 'navigate' ]);

    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [ { provide: Router, useValue: routerSpy },
        { provide: MainComponent, useValue: mainSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    mainComponent = TestBed.get(MainComponent);
    mainComponent.sign_in();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call court1', () => {
    spyOn(window, 'alert');
    component.court1();
    expect(window.alert).toHaveBeenCalledWith("기숙사 운동장\n코트 2개\n샤워장 있음");
  })

  it('should call court2', () => {
    spyOn(window, 'alert');
    component.court2();
    expect(window.alert).toHaveBeenCalledWith("대운동장\n코트 2개\n샤워장 없음");
  })

  it('should call court3', () => {
    spyOn(window, 'alert');
    component.court3();
    expect(window.alert).toHaveBeenCalledWith("301동 주차장\n코트4개\n샤워장 없음");
  })

  it('should call sign_in', () =>{
    component.sign_in();
    expect(mainComponent.sign_in).toHaveBeenCalled();
  })

});
