import { Injectable } from "@angular/core";
import { Cart, ICart, isCart } from "../Cart";
import { Product } from "../Product";


const LOCALSTORAGE_KEY = "ngCommerce-cart";

@Injectable({
    providedIn: 'root',
})
export class CartService {

    getCart(): ICart {
        let raw = localStorage.getItem(LOCALSTORAGE_KEY);
        if (raw) {
            let cart = JSON.parse(raw);

            if (isCart(cart)) {
                return cart
            }
        }

        return new Cart();
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
    }
}