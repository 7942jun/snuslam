import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mainComponent: jasmine.SpyObj<MainComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const mainSpy = jasmine.createSpyObj('MainComponent',
      ['court1', 'court2', 'court3', 'sign_in']);

    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [ { provide: Router, useValue: router },
        { provide: MainComponent, useValue: mainSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    mainComponent = TestBed.get(MainComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call court1', () => {
    expect(mainComponent.court1).toBeTruthy();
  })

  it('should call court2', () => {
    expect(mainComponent.court2).toBeTruthy();
  })

  it('should call court3', () => {
    expect(mainComponent.court3).toBeTruthy();
  })

  it('should call sign_in', () =>{
    mainComponent.sign_in();
    expect(mainComponent.sign_in).toHaveBeenCalled();
  })

});
