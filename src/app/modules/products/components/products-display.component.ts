import { Component, OnInit, Input } from '@angular/core';
import { CategoryModel } from '@core/models/category.interface';
import { ProductModel } from '@core/models/product.interface';
import { CategoryService } from '@core/services/category-service';
import { ProductService } from '@core/services/product-service';
import { Constants } from '@core/constants/cachekey.constant';
import { CartModel } from '@core/models/cart.model';
import { CacheService } from '@core/services/cache.service';
import { LoggerService } from '@core/services/logger/logger.service';

@Component({
    selector: 'ts-products-display',
    templateUrl: '../templates/views/products-display.component.html'

})
export class ProductsDisplayComponent implements OnInit {
    categories: CategoryModel[];
    products: ProductModel[];

    constructor(private _categoryService:CategoryService,
        private _productService: ProductService,
        private _cacheService:CacheService,
        private _loggerService:LoggerService){
    }

    ngOnInit(): void {
        //this._loggerService.log('Products','ngOnInit', 'Loading products');
        this.loadcategories();
        this.loadProducts(1);
    }

    /**
    * gets triggered when user click on category
    * @param $event 
    */
    onCategorySelection($event) {
        this.loadProducts($event.id);
    }

    loadCartIfExists(){
        const cart:CartModel = this._cacheService.get(Constants.CacheKey.CartInfo);
     }

    loadcategories() {
        this._categoryService.getCategoires().subscribe(res=>{
            this.categories = res;
        })
        // this.categories = [{
        //     name: 'Mobile & Tablets'
        // }, {
        //     name: 'Electronics'
        // },
        // {
        //     name: 'Health Care Products'
        // }]
    }

    loadProducts(categoryId:number) {
        this._productService.getProductsByCategoryId(categoryId)
        .subscribe(res=>{
            this.products = res;
        });
        // this.products = [{
        //     name: 'Samsung Galaxy M01 (Black, 32 GB)  (3 GB RAM)',
        //     itemNumber: '001',
        //     price: 9999,
        //     rating: 4,
        //     imagePath: '',
        //     slug: 'samsung-galaxy-M01-Black-32-3',
        //     id: 1
        // },
        // {
        //     name: 'Samsung Galaxy M01 (Black, 64 GB)  (4 GB RAM)',
        //     itemNumber: '002',
        //     price: 12999,
        //     rating: 4,
        //     imagePath: '',
        //     slug: 'samsung-galaxy-M01-Black-64-4',
        //     id: 2
        // },
        // {
        //     name: 'Samsung Galaxy A31 (Prism Crush Black, 128 GB)  (6 GB RAM)',
        //     itemNumber: '002',
        //     price: 12999,
        //     rating: 4,
        //     imagePath: '',
        //     slug: 'samsung-galaxy-A31-Black-128-6',
        //     id: 3
        // },
        // {
        //     name: 'Samsung Galaxy M11 (Metallic Blue, 64 GB)  (4 GB RAM)',
        //     itemNumber: '002',
        //     price: 12999,
        //     rating: 4,
        //     imagePath: '',
        //     slug: 'samsung-galaxy-M11-Metallic-Blue-64-4',
        //     id: 4
        // },
        // {
        //     name: 'Samsung Galaxy A51 (Prism Crush Blue, 128 GB)  (8 GB RAM)',
        //     itemNumber: '002',
        //     price: 12999,
        //     rating: 4,
        //     imagePath: '',
        //     slug: 'samsung-galaxy-A51-PrismCrush-Blue-128-8',
        //     id: 5
        // },
        // {
        //     name: 'Samsung Galaxy A21s (Blue, 64 GB)  (4 GB RAM)',
        //     itemNumber: '002',
        //     price: 12999,
        //     rating: 4,
        //     imagePath: '',
        //     slug: 'samsung-galaxy-A21s-Blue-64-4',
        //     id: 6
        // }]
    }
}