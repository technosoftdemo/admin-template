import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsDisplayComponent } from './components/products-display.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsDisplayComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
