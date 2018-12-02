import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { RankComponent } from './rank.component';

describe('RankComponent', () => {
    let comp: RankComponent;
    let fixture: ComponentFixture<RankComponent>;

    beforeEach(() => {
        const locationStub = {
            back: () => ({})
        };
        const userServiceStub = {
            getUsers: () => ({
                subscribe: () => ({})
            }),
            searchUsers: () => ({
                subscribe: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [ RankComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: Location, useValue: locationStub },
                { provide: UserService, useValue: userServiceStub }
            ]
        });
        fixture = TestBed.createComponent(RankComponent);
        comp = fixture.componentInstance;
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
            const userServiceStub: UserService = fixture.debugElement.injector.get(UserService);
            spyOn(userServiceStub, 'getUsers');
            comp.getUsers();
            expect(userServiceStub.getUsers).toHaveBeenCalled();
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
