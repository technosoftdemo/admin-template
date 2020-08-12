import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "angular-2-local-storage";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { UserSessionService } from '@core/services/user-session.service';
import { EventBrokerService } from '@core/services/event-broker.service';
import { Constants } from '@core/constants/cachekey.constant';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'TechMonks';

  constructor(private _authService: UserSessionService,
    private _eventBrokerService: EventBrokerService,
    private _router: Router) {
  }

  ngOnInit() {
    this._eventBrokerService.register(Constants.Events.Logout);
    this._eventBrokerService.register(Constants.Events.CartCount);
    this._eventBrokerService.register(Constants.Events.reloadCart);
  }

  /**
   * Redirect User to Dashboard module
   */
  redirectToDashboard(): void {
    this._router.navigate(['/dashboard']);
  }
}
