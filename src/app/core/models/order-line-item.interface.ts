export interface OrderLineItemModel{
    lineItemNumber?:number;
    id?:number;
    productId:number;
    productName:string;
    code?:string;
    price:number;
    quantity:number;
    tax?:number;
    imgUrl?:string;

}