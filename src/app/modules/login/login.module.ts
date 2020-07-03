import { Component, NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login.routing';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule
    ]
})
export class LoginModule {

}