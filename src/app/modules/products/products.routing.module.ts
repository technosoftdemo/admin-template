import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsDisplayComponent } from './components/products-display.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { HasPrivilegeGuard } from '@core/guards/has-privilege.guard';

export const routes: Routes = [
    {
        path: '',
        component: ProductsDisplayComponent
    },
    {
        path: ':id',
        component: ProductDetailComponent,
        canActivate: [HasPrivilegeGuard],
        data: { privileges: ['View_ProductDetail'] }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
