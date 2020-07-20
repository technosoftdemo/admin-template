import { ApiClient } from './api-client.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryModel } from '@core/models/category.interface';
import { environment } from '@env/environment';
import { ProductModel } from '@core/models/product.interface';
import { CartModel } from '@core/models/cart.model';
import { OrderLineItemModel } from '@core/models/order-line-item.interface';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
    constructor(private _apiClient: ApiClient) { }
    getCartById(cartId: number): Observable<CartModel[]> {
        return this._apiClient
            .get(environment.cartAPISuffix + `/v1/carts/${cartId}`);
    }

    create(cart: CartModel): Observable<CartModel> {
        return this._apiClient
            .post(`${environment.cartAPISuffix}/v1/carts`, cart);
    }

    addItem(cartId: number, item: OrderLineItemModel): Observable<OrderLineItemModel> {
        return this._apiClient
            .post(`${environment.cartAPISuffix}/v1/carts/${cartId}/items`, item);
    }

    updateItem(cartId: number, item: OrderLineItemModel): Observable<OrderLineItemModel> {
        return this._apiClient
            .put(`${environment.cartAPISuffix}/v1/carts/${cartId}/items/${item.id}`, item);
    }

    deleteItem(cartId: number, itemId: number) {
        return this._apiClient
            .delete(`${environment.cartAPISuffix}/v1/carts/${cartId}/items/${itemId}`);
    }
}