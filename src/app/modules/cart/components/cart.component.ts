import { OnInit, Component } from '@angular/core';
import { CartModel } from '@core/models/cart.model';
import { CacheService } from '@core/services/cache.service';
import { Constants } from '@core/constants/cachekey.constant';
import { OrderLineItemModel } from '@core/models/order-line-item.interface';
import { CartService } from '@core/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '@shared/services/dialog.service';
import { NotificationToasterService } from '@shared/services/notification-toaster.service';
import { EventBrokerService } from '@core/services/event-broker.service';
import { Location } from '@angular/common';

@Component({
    selector: 'login',
    templateUrl: '../templates/views/cart.component.html',
    styleUrls: ['../templates/themes/less/cart.component.less']

})
export class CartComponent implements OnInit {

    cart: CartModel;
    constructor(private _cacheService: CacheService,
        private _cartService:CartService,
        private dialog: MatDialog,
        private dialogService: DialogService,
        private _toasterMessageService: NotificationToasterService,
        private _eventbrokerService:EventBrokerService,
        private location: Location) {

    }

    ngOnInit(): void {
        this.loadShoppingCartSession();
        this.subscribeReloadCart();
    }

    loadShoppingCartSession() {
      let savedcart: CartModel =  this._cartService.getCart();
      if(savedcart){
        this.cart = new CartModel(savedcart.items);
      }
    }

    updateQuantity(lineItem: OrderLineItemModel, $evt: any): void {
        if ($evt && $evt.currentTarget.value) {
            let updatedQuantity = $evt.currentTarget.value;
            this._cartService.addItem(lineItem);
            //this.updateSpecificItemQuantity(lineItem, updatedQuantity, '');
        }
    }
    subscribeReloadCart(){
        this._eventbrokerService.subscribe(Constants.Events.reloadCart).subscribe(res=>{
            let cart = this._cartService.getCart();
            if(cart){
                this.cart = new CartModel(cart.items);
            }
        })
    }

    back() {
        this.location.back();
      }

    deleteItem(orderLineItemModel: OrderLineItemModel) {
        this.dialogService.openConfirm({
            title: 'Delete Confirmation',
            message: `Do you wish to delete <b>${orderLineItemModel.productName}</b>?`,
            acceptButton: 'OK',
            cancelButton: 'CANCEL',
            disableClose: false,
            autoFocus: true
        }).afterClosed().subscribe(result => {
            if (result) {
                this._cartService.deleteItem(orderLineItemModel.id); 
                this._toasterMessageService.showItemdeletionMsg();               
                //Do required deletes and other functionality here
            };
        });
    }
}