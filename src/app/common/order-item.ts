import { CartItem } from "./cart-item";

export class OrderItem {

  imageUrl!: string;
  productId!: string;
  unitPrice!: number;
  quantity!: number;

  constructor(cartItem: CartItem) { // initialize from cart item
    this.imageUrl = cartItem.imageUrl;
    this.productId = cartItem.id.toString();
    this.unitPrice = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
  }
}
