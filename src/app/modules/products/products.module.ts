import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products.routing.module';
import { ProductsDisplayComponent } from './components/products-display.component';
import { CategoriesListComponent } from './components/categories-list.component';
import { ProductsListComponent } from './components/products-list.component';
import { ProductComponent } from './components/product.component';


@NgModule({
    declarations: [
        ProductsDisplayComponent,
        CategoriesListComponent,
        ProductsListComponent,
        ProductComponent
    ],
    imports: [
        ProductsRoutingModule,
        SharedModule
    ],
    exports: [],
    providers: [],
    entryComponents: [ProductsDisplayComponent]
})
export class ProductsModule { }