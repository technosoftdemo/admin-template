import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '@core/services/user-session.service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { CacheService } from '@core/services/cache.service';
import { EventBrokerService } from '@core/services/event-broker.service';
import { Constants } from '@core/constants/cachekey.constant';
import { CartService } from '@core/services/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: '../templates/template1/views/app-header.component.html'
})
export class HeaderComponent implements OnInit {

    displayUserActionPane = false;
    logoPath = '';
    userName = '';
    itemCount: number = 0;
    constructor(private _authService: UserSessionService,
        private _cacheService: CacheService,
        private _eventBrokerService: EventBrokerService,
        private _cartService: CartService,
        private _router: Router) {

    }

    ngOnInit(): void {
        this.setImagePath();
        this.cartCountSubscription();
        this.subscribeToLogout();
        this.setUserActionPanelDisplayMode();
        this.setUserName();

    }

    subscribeToLogout() {
        this._eventBrokerService.subscribe(Constants.Events.Logout).subscribe(res => {
            this._authService.logout();
            this.setUserActionPanelDisplayMode();
        });
    }

    cartCountSubscription() {
        this._cartService.getCart();
        this._eventBrokerService.subscribe(Constants.Events.CartCount).subscribe(res => {
            this.itemCount = res;
        });
    }

    login() {
        this._router.navigateByUrl('./Auth/login');
    }

    setUserActionPanelDisplayMode(): void {
        this.displayUserActionPane = this._authService.isUserLoggedIn() ? true : false;
        console.log(this.displayUserActionPane);
    }

    setImagePath(): void {
        //this.logoPath = (environment.production === true ? 'img/logo.png' : 'assets/img/logo.png');
        this.logoPath = 'assets/img/logo.png';

    }

    setUserName() {
        const userInfo = this._authService.getUserInfo();
        if (userInfo) {
            this.userName = this._authService.getUserInfo().userName;
        }
    }

    logout() {
        this._eventBrokerService.publish(Constants.Events.Logout);
        this.displayUserActionPane = false;
        this._authService.logout();
        this._router.navigateByUrl('auth/login');
    }
}