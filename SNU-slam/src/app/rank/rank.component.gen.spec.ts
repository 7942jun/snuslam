import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { RankComponent } from './rank.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('RankComponent', () => {
    let comp: RankComponent;
    let fixture: ComponentFixture<RankComponent>;
    let userService: jasmine.SpyObj<UserService>;

    beforeEach(() => {
        const locationStub = {
            back: () => ({})
        };
        const userSpy = jasmine.createSpyObj('UserService', ['getUsers']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ RankComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: 'API_URL', useValue: '/api/user'},
                { provide: Location, useValue: locationStub },
                { provide: UserService, useValue: userSpy }
            ]
        });
        fixture = TestBed.createComponent(RankComponent);
        comp = fixture.componentInstance;
        userService = TestBed.get(UserService);
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'getUsers');
            comp.ngOnInit();
            expect(comp.getUsers).toHaveBeenCalled();
        });
    });

    describe('getUsers', () => {
        it('makes expected calls', () => {
            userService.getUsers();
            expect(userService.getUsers).toHaveBeenCalled();
        });
    });

    describe('goBack', () => {
        it('makes expected calls', () => {
            const locationStub: Location = fixture.debugElement.injector.get(Location);
            spyOn(locationStub, 'back');
            comp.goBack();
            expect(locationStub.back).toHaveBeenCalled();
        });
    });

});
