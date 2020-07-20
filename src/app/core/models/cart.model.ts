import { OrderLineItemModel } from '@core/models/order-line-item.interface';

export class CartModel {
    id:number;
    cartType:number = 1;
    sessionId: string;
    items: OrderLineItemModel[];
    shippingCost?: number = 0;
    totalTax: number = 0;
    subTotal: number = 0;

    constructor(items: OrderLineItemModel[], shippingCost?: number, totalTax?: number) {
        this.items = items;
        this.shippingCost = shippingCost;
        this.totalTax = totalTax;
        this.calculateItemsSubTotal();
    }

    public calculateItemsSubTotal() {
        let total = 0;
        if (this.items.length > 0) {
            this.items.forEach(item => {
                total = total + (item.price * item.quantity);
            })
        }
        this.subTotal = total;
    }

    public calculateItemTotal() {
        let subTotal = 0;
        let tax = 0;
        if (this.items.length > 0) {
            this.items.forEach(item => {
                subTotal = subTotal + (item.price * item.quantity);
                tax = tax + (item.tax * item.quantity);
            })
        }
        return (subTotal + ~~tax + (~~this.shippingCost));
    }
}