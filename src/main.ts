import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from "@env/environment";

declare let apiConfig: any;
if (environment.production) {
  enableProdMode();
  console.log('prod mode enabled');
  //Disable all the console messages
  if (window) {
    window.console.log = function () {
    };
  }
}
//Bootstraping App Module and log error in console incase of error
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
