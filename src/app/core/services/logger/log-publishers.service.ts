import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi } from "./log-publishers";
import { ApiClient } from '../api-client.service';

// ****************************************************
// Logging Publishers Service Class
// ****************************************************
@Injectable({providedIn:'root'})
export class LogPublishersService {
  constructor(private _apiClient: ApiClient) {
    // Build publishers arrays
    this.buildPublishers();
  }

  // Public properties
  publishers: LogPublisher[] = [];

  // *************************
  // Public methods
  // *************************
  // Build publishers array
  buildPublishers(): void {
    // Create instance of LogConsole Class
    this.publishers.push(new LogConsole());

    // Create instance of LogLocalStorage Class
    // this.publishers.push(new LogLocalStorage());

    //Create instance of LogWebApi Class
    // this.publishers.push(new LogWebApi(this._apiClient));
  }
}