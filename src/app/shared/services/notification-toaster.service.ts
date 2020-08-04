import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotificationToasterService {
    constructor(private toastr: ToastrService) { }
    showSuccess() {
        this.toastr.success('Item Added to Cart!', 'Shopping Cart', {
            timeOut: 1000,
        });
    }

    showItemdeletionMsg() {
        this.toastr.success('Item Deleted from the Cart!', 'Shopping Cart', {
            timeOut: 1000,
        });
    }
}