import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
    imports: [
        AppModule,
        BrowserModule.withServerTransition({ appId: 'my-app' }),
        TransferHttpCacheModule,
    ],
    bootstrap: [AppComponent]
})
export class AppBrowserModule { };