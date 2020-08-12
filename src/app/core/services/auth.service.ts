import { Injectable } from '@angular/core';
import { Privilege } from '@core/models/privilege.interface';
import { CacheService } from './cache.service';
import { Constants } from '@core/constants/cachekey.constant';
import { UserSessionService } from './user-session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _privileges: Privilege[];
    constructor(private _userSessionService: UserSessionService) { }

    private getPrivileges() {
        this._privileges = this._userSessionService.getUserPrivileges();
        return this._privileges;
    }

    hasPrivilege(privilegeNames: string[]): boolean {
        const privileges = this.getPrivileges();
        if (privileges && privilegeNames) {
            for (const privilege of privilegeNames) {
                let exists = (privileges.filter(x => x.code.toLowerCase()
                    == privilege.toLowerCase()).length > 0) ? true : false;
                if (exists) {
                    return exists;
                }
            }
        }
        return false;
    }

}