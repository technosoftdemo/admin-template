import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '@core/models/product.interface';
import { OrderLineItemModel } from '@core/models/order-line-item.interface';
import { CartModel } from '@core/models/cart.model';
import { EventBrokerService } from '@core/services/event-broker.service';
import { Constants } from '@core/constants/cachekey.constant';
import { NotificationToasterService } from '@shared/services/notification-toaster.service';
import { CacheService } from '@core/services/cache.service';
import { CartService } from '@core/services/cart.service';

@Component({
    selector: 'ts-products-list',
    templateUrl: '../templates/views/products-list.component.html',
    styleUrls: ['../templates/less/product-list.component.less']
})
export class ProductsListComponent implements OnInit {

    @Input()
    products: ProductModel[];
    items: OrderLineItemModel[] = [];
    shoppingCart: CartModel = new CartModel(this.items);
    constructor(private _eventBrokerService: EventBrokerService,
        private _toasterMessageService: NotificationToasterService,
        private _cacheService: CacheService,
        private _cartService:CartService) {

    }

    ngOnInit(): void {
        this.loadCart();
    }

    loadCart() {
        this.shoppingCart = this._cartService.getCart();
        this._cartService.triggerCartCountUpdateEvent(this.shoppingCart.items.length);
    }

    addItem(lineItem: OrderLineItemModel) {
       this._cartService.addItem(lineItem);
        //this.triggerCartCountUpdateEvent(this.shoppingCart.items.length);
        this._toasterMessageService.showSuccess();
        // this.calculateSubTotal();
        // this.calculateOrderTotalBreakdown();
    }

    updateSpecificItemQuantity(lineItem, quantity: number, incrementType) {
        this.shoppingCart.items.map(item => {
            if (item.productId === lineItem.productId) {
                item.quantity = (incrementType === 'Increment' ? item.quantity + 1 : quantity);
            }
            return item;
        });
        // this.calculateSubTotal();
        // this.calculateOrderTotalBreakdown();
    }

    updateQuantity(lineItem: OrderLineItemModel, $evt: any): void {
        if ($evt && $evt.currentTarget.value) {
            let updatedQuantity = $evt.currentTarget.value;
            this.updateSpecificItemQuantity(lineItem, updatedQuantity, '');
        }
    }

}