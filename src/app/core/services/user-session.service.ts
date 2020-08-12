import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { Constants } from '@core/constants/cachekey.constant';
import { UserModel } from '@core/models/user.interface';
import { EventBrokerService } from './event-broker.service';
import { Privilege } from '@core/models/privilege.interface';

@Injectable({ providedIn: 'root' })
export class UserSessionService {
    userName = '';
    private _privileges: Privilege[];
    private _userInfo: UserModel;
    private _authToken: string;

    constructor(private _cacheService: CacheService,
        private _eventBrokerService: EventBrokerService) {
    }

    /**
 * get user info data from storage service
 * @returns Member
 */
    getUserInfo(): UserModel {
        if (this._userInfo) {
            return this._userInfo;
        } else {
            this._userInfo = this._cacheService.get(Constants.CacheKey.UserInfo);
            if (this._userInfo) {
                return this._userInfo;
            } else {
                return null;
            }
        }
    }
    /**
     * save user info in storage  service
     * @param  {Member} userInfo
     * @returns void
     */
    setUserInfo(userInfo: UserModel): void {
        if (userInfo) {
            this._userInfo = userInfo;
            this._cacheService.set(Constants.CacheKey.UserInfo, userInfo);
        }
    }

    isUserLoggedIn(): boolean {
        const userInfo = this.getUserInfo();
        return userInfo ? true : false;
    }

    logout() {
        //this._cacheService.removeAll(true);
        this._userInfo = null;
        this._authToken = null;
    }

    getAuthToken = () => {
        if (!this._authToken) {
            this._authToken = this._cacheService.get(Constants.CacheKey.AuthToken);
        }
        return this._authToken ? 'bearer ' + this._authToken : '';
    }

    setAuthToken = (authToken: string) => {
        this._cacheService.set(Constants.CacheKey.AuthToken, authToken);
        this._authToken = authToken;
    }

    getLoggedInUserId = () => {
        if (this._userInfo) {
            return this._userInfo.id;
        }
        return null;
    }

    getUserPrivileges() {
       // this._privileges = this._userInfo.privileges;
        this._privileges = this.mockPrivileges();
        return this._privileges;
    }

    mockPrivileges(){
     const privileges:Privilege[] = [];
     privileges.push(new Privilege('View_ProductDetail'));
     privileges.push(new Privilege('View_ProductReviews'));
     privileges.push(new Privilege('View_ProductRatings'));
     return privileges;
    }

    authEnabled = () => true;

}