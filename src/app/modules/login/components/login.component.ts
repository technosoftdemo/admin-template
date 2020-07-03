import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { CacheService } from '@core/services/cache.service';
import { LoginService } from '@core/services/login.service';
import { UserModel } from '@core/models/user.interface';
import { EventBrokerService } from '@core/services/event-broker.service';
import { Constants } from '@core/constants/cachekey.constant';

@Component({
    selector: 'login',
    templateUrl: '../templates/template1/views/login.component.html',
    styleUrls: ['../templates/template1/themes/less/login.component.less']

})
export class LoginComponent implements OnInit {

    error: string;
    isLoading: boolean;
    loginForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
        private _router: Router,
        private _authService: AuthService, 
        private _cacheService: CacheService,
        private _eventBrokerService: EventBrokerService,
        private _loginService: LoginService) {
        this.buildLoginForm();
    }
    ngOnInit() {
        console.log('Loading login component');
        this._eventBrokerService.publish(Constants.Events.Logout);
    }
/**
 * Authenticate User with provided credentials
 * @param loginModel 
 * @param isValid 
 */
    login(loginModel: LoginModel, isValid) {
        console.log(loginModel, {});
        this._loginService.authenticateUser(loginModel).subscribe(x => {
            if (x.authToken) {
                let userModel = this.constructUserModel(x);
                this._authService.setUserInfo(userModel);
                this._authService.setAuthToken(x.authToken);
                this._router.navigate(['home/dashboard']);
            }
            else {
                this.error = x.errorMessage;
            }
        });
    }

    constructUserModel(loginResponseModel: LoginResponseModel) {
        let userDetails: UserModel = {
            emailId: loginResponseModel.emailId,
            firstName: loginResponseModel.firstName,
            middleName: loginResponseModel.middleName,
            lastName: loginResponseModel.lastName,
            id: loginResponseModel.id,
            userName: loginResponseModel.userName
        }
        return userDetails;
    }

    displayLoginFailure() {
        return this.error ? true : false;
    }

    private buildLoginForm() {
        this.loginForm = this._formBuilder.group({
            loginId: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
}