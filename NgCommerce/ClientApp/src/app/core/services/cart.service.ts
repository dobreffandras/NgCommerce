import { Injectable } from "@angular/core";
import { Cart, ICart, isCart } from "../Cart";
import { Product } from "../Product";
import { Observable, Subject, concat, of } from "rxjs";


const LOCALSTORAGE_KEY = "ngCommerce-cart";

@Injectable({
    providedIn: 'root',
})
export class CartService {
    public cart : Observable<ICart>;
    _cart: Subject<ICart> = new Subject();

    constructor() {
        this.cart = concat(of(this.getCart()), this._cart);
    }

    addProductToCart(p: Product, amount: number = 1) {
        let cart = this.getCart();
        let existingItem = cart.items.find(i => i.productId == p.id);

        if (existingItem) {
            existingItem.amount+=amount;
        } else {
            cart.items.push({
                productId: p.id,
                name: p.name,
                coverImageUrl: p.coverImageUrl,
                itemPrice: p.price,
                amount: amount,
            });
        }

        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cart));
        this._cart.next(this.getCart());
    }
    
    private getCart(): ICart {
        let raw = localStorage.getItem(LOCALSTORAGE_KEY);
        if (raw) {
            let cartData = JSON.parse(raw);

            if (isCart(cartData)) {
                return new Cart(cartData);
            }
        }

        return new Cart();
    }
}