import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductModel } from '@core/models/product.interface';
import { OrderLineItemModel } from '@core/models/order-line-item.interface';

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

    ngOnInit(): void {

    }

    addItem = (item) => {
        debugger;
        this.addItemToCart.emit(this.formatProductToOrderLineItem(item));
    }

    formatProductToOrderLineItem(product: ProductModel) {
        const orderLineItem: OrderLineItemModel = {
            productName: product.name,
            price: product.price,
            quantity: 1,
            code: product.itemNumber,
            productId: product.id,
            imgUrl:product.imageUrl
        }
        return orderLineItem;
    }
}