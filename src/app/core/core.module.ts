import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { httpInterceptorProviders } from './incerceptors';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalStorageService, LocalStorageModule } from 'angular-2-local-storage';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppTranslateService } from './services/app-translate.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    LocalStorageModule.forRoot({
      prefix: 'appflp360',
      storageType: 'localStorage'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, LocalStorageService, CookieService]
      }
    })
  ],
  providers: [httpInterceptorProviders, AuthGuard, NoAuthGuard],
  exports: [TranslateModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import CoreModule module in the AppModule only.`);
    }
  }
}

export function HttpLoaderFactory(http: HttpClient, Storage: LocalStorageService, cookieService: CookieService) {
  return new AppTranslateService(http, Storage, cookieService);
}
