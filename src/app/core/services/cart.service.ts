import { ApiClient } from './api-client.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryModel } from '@core/models/category.interface';
import { environment } from '@env/environment';
import { CacheService } from './cache.service';
import { ShoppingCartService } from './shopping-cart-service';
import { Constants } from '@core/constants/cachekey.constant';
import { CartModel } from '@core/models/cart.model';
import { OrderLineItemModel } from '@core/models/order-line-item.interface';
import { EventBrokerService } from './event-broker.service';

@Injectable({ providedIn: 'root' })
export class CartService {
    private _cart: CartModel;
    constructor(private _cacheService: CacheService,
        private _shoppingCartService: ShoppingCartService,
        private _eventBrokerService: EventBrokerService) { }

    getCart() {
        const cart: CartModel = this._cacheService.get(Constants.CacheKey.CartInfo);
        if (cart) {
            this._cart = cart;
            this.triggerCartCountUpdateEvent(this._cart.items.length);
        }
        return this._cart;
    }

    addItem(lineItem: OrderLineItemModel) {
        this.getCart();
        if (this._cart === undefined || this._cart === null) {
            let lineItems: OrderLineItemModel[] = [];
            lineItem.lineItemNumber = 1;
            lineItems.push(lineItem);
            this._cart = new CartModel(lineItems);
            this.saveCart(this._cart);
        }
        else {
            if (this._cart.items.filter(x => x.productId === lineItem.productId).length > 0) {
                this.updateSpecificItemQuantity(lineItem, 1, 'Increment');
            }
            else {
                lineItem.lineItemNumber = this._cart.items.length + 1;
                lineItem.quantity = 1;
                //this._cart.items.push(lineItem);
                this._shoppingCartService.addItem(this._cart.id, lineItem)
                    .subscribe(res => {
                        this._cart.items.push(res);
                        this._cacheService.set(Constants.CacheKey.CartInfo, this._cart);
                        this.triggerCartCountUpdateEvent(this._cart.items.length);
                    });
            }

        }
    }

    deleteItem(itemId: number) {
        this.getCart();
        this._shoppingCartService.deleteItem(this._cart.id, itemId).subscribe(res => {
            let index = this._cart.items.findIndex(d => d.id === itemId);
            this._cart.items.splice(index, 1);
            this._cacheService.set(Constants.CacheKey.CartInfo, this._cart);
            this._eventBrokerService.publish(Constants.Events.reloadCart);
            this.triggerCartCountUpdateEvent(this._cart.items.length);
        });
    }

    saveCart(cart: CartModel) {
        this.getCart();
        this._shoppingCartService.create(cart).subscribe(res => {
            this._cart = res;
            this._cacheService.set(Constants.CacheKey.CartInfo, this._cart);
            this.triggerCartCountUpdateEvent(this._cart.items.length);
        });
    }

    updateSpecificItemQuantity(lineItem, quantity: number, incrementType) {
        this.getCart();
        let updateItem: OrderLineItemModel;
        this._cart.items.map(item => {
            if (item.productId === lineItem.productId) {
                item.quantity = (incrementType === 'Increment' ? item.quantity + 1 : quantity);
                updateItem = item;
            }
            return item;
        });
        this._shoppingCartService.updateItem(this._cart.id, updateItem).subscribe(res => {
            this.triggerCartCountUpdateEvent(this._cart.items.length);
        });
    }

    triggerCartCountUpdateEvent(itemCount: number) {
        this._eventBrokerService.publish(Constants.Events.CartCount, itemCount);
    }
}