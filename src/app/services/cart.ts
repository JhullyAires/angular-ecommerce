import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id === theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem. id === theCartItem.id); // trocando o for if pelo find que faz o mesmo com menos linha, e só executa vverificação até condição ser igual a true

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      // increment the quantity
      existingCartItem!.quantity++; //The ! informs the compiler that, at this point you are absolutely certain that existingCartItem is not undefined and that it can be treated as a regular CartItem.
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice; // calculating total price
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values, and all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the Cart: ');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`); // toFixed(2) == two digits after decimal, ex: 124.98
    console.log('...'); // toFixed(2) == two digits after decimal, ex: 124.98
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--; // decrement the quantity
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem); // remove item from cart
    } else {
      this.computeCartTotals(); // recompute cart total price and total quantity
    }
  }

  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id === theCartItem.id
    );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1); // remove 1 item at the given index
      this.computeCartTotals(); // recompute cart total price and total quantity
    }
  }
}
