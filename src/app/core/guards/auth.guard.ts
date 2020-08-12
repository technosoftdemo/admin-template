import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserSessionService } from '@core/services/user-session.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _authService: UserSessionService, private _router: Router) {

    }
    canActivate(): boolean {
        if (this._authService.isUserLoggedIn()) {
            return true;
        }
        else {
            this._router.navigate(["auth/login"]);
            return false;
        }
    }
}
