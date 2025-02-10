import { TestBed, ComponentFixture } from "@angular/core/testing";

import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { ApiResponse } from '../data/apiResponse';
import { User } from '../data/user';
import { Observable, of } from "rxjs";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let toastService = jasmine.createSpyObj('ToastService', ['displayError', 'displayMessage']);
    let authService = jasmine.createSpyObj('AuthService', ['login']);

    beforeEach(async() => {
        toastService.displayError.and.returnValue('Error Occur');
        toastService.displayMessage.and.returnValue('Login Successfully!');
        authService.login.and.returnValue(fakeApiResponse());

        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [
                { provide: AuthService, useValue: authService},
                { provide: ToastService, useValue: toastService}
            ]
        });
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Should be created', () => {
        expect(component).toBeTruthy();
    });
    
});

function fakeApiResponse(): Observable<ApiResponse<User[]>> {
    return of({
        apiMessage: 'Fake success',
        statusCode: 200,
        success: true,
        data: [{
            _id: '123456',
            email: 'sometest@email.com',
            name: 'Test',
            accessToken: 'RaNdoMT0kEn'
        }]
    });
}