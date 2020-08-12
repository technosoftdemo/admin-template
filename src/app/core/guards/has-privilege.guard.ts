import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class HasPrivilegeGuard implements CanActivate {
    constructor(private _authService: AuthService,
        private _router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        const privileges = route.data['privileges'];
        if (this._authService.hasPrivilege(privileges)) {
            return true;
        }
        else {
            this._router.navigateByUrl('auth/notfound',
                { skipLocationChange: true, queryParams: { returnUrl: state.url } });
        }
    }

}
