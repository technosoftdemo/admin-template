import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "angular-2-local-storage";
import { Router, RoutesRecognized, NavigationEnd } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { UserSessionService } from '@core/services/user-session.service';
import { EventBrokerService } from '@core/services/event-broker.service';
import { Constants } from '@core/constants/cachekey.constant';
import { LoggerService } from './core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'TechMonks';

  constructor(private _authService: UserSessionService,
    private _eventBrokerService: EventBrokerService,
    private _router: Router,
    private _loggerService: LoggerService) {
  }

  ngOnInit() {
    this._eventBrokerService.register(Constants.Events.Logout);
    this._eventBrokerService.register(Constants.Events.CartCount);
    this._eventBrokerService.register(Constants.Events.reloadCart);
    this.registerRouteEvents();
  }

  /**
   * Redirect User to Dashboard module
   */
  redirectToDashboard(): void {
    this._router.navigate(['/dashboard']);
  }

  /**
   * Global Navigation Logger
   * Below are the router events you can capture as part of router navigation
   *   NavigationEnd
   *   NavigationCancel
   *   NavigationError
   *   RoutesRecognized
   */
  registerRouteEvents() {
    let navigationRoute = '';
    let redirectUrl = '';
    let navigationEnded = false;
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (navigationRoute === '') {
          this._loggerService.log('navigation', '', `user navigated to URL: ${event.url}`);
        }
        else {
          if (navigationEnded === false) {
            this._loggerService.log('navigation', '', `user navigated to URL: ${navigationRoute}`);
            navigationRoute = '';
            if (redirectUrl) {
              this._loggerService.log('navigation', '', `user redirected to URL: ${redirectUrl}`);
              redirectUrl = '';
            }
          }
        }
        navigationEnded = true;
      }
      if (event instanceof RoutesRecognized) {
        if (!navigationEnded && redirectUrl === '') {
          redirectUrl = event.url;
        }
        if (navigationEnded) {
          navigationRoute = event.url;
        }
        navigationEnded = false;
      }
    });
  }
}
