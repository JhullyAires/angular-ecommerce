import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItem } from '../../common/cart-item';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {

  product!: Product; // the ! is the non-null assertion operator, tells to suspend stict null and undefined checks for a property

  constructor(
    private cartService: CartService,
    public activeModal: NgbActiveModal
  ) { }

  addToCart() {
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);

    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

  closeModal() {
    this.activeModal.dismiss('Close click');
  }
}
