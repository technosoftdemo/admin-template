import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CartRoutingModule } from './cart.routing.module';
import { CartComponent } from './components/cart.component';

@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        SharedModule
    ]
})
export class CartModule {

}