import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart, ICart } from 'src/app/core/Cart';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy{
  public cart: ICart = new Cart();
  private subscription : Subscription | undefined;

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartService.cart.subscribe(
      c => {
        this.cart = c;
      }
    );
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
