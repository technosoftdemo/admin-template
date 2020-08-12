import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from '@core/models/product.interface';
import { OrderLineItemModel } from '@core/models/order-line-item.interface';
import { LoggerService } from '@core/services/logger/logger.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ts-product',
    templateUrl: '../templates/views/product.component.html',
    styleUrls: ['../templates/less/product.component.less']

})
export class ProductComponent implements OnInit {

    @Output()
    addItemToCart = new EventEmitter<OrderLineItemModel>();

    @Input()
    product: ProductModel;

    constructor(private _loggerService: LoggerService, private _router: Router) { }

    ngOnInit(): void {

    }

    addItem = (item) => {
        this.addItemToCart.emit(this.formatProductToOrderLineItem(item));
    }

    formatProductToOrderLineItem(product: ProductModel) {
        const orderLineItem: OrderLineItemModel = {
            productName: product.name,
            price: product.price,
            quantity: 1,
            code: product.itemNumber,
            productId: product.id,
            imgUrl: product.imageUrl
        }
        return orderLineItem;
    }

    navigateToProductDetails(id: number) {
        this._loggerService.log('Product Detail', 'Navigation', 'Product Id' + id);
        this._router.navigateByUrl('/products/' + id);
    }
}