export interface ICart {
    // id: number; //TODO will be used when we save carts to DB 
    items: CartItem[];
    sumTotal: number;
}

export class Cart implements ICart {
    items: CartItem[] = [];
    get sumTotal() : number {
        return this.items.map(x => x.amount * x.itemPrice).reduce((prev, curr) => prev + curr, 0);
    }
}

export type CartItem = {
    productId: number,
    name: string,
    coverImageUrl: string | undefined;
    itemPrice: number;
    amount: number;
}

export function isCart(o: any) : o is Cart  {
    if("items" in o) {
        if(Array.isArray(o.items)) {
            return (<Array<any>>o.items).every(i => isCartItem(i));
        } 
    }

    return false;
}

export function isCartItem(o: any) : o is CartItem  {
    const hasCorrectProperties = 
    "productId" in o 
    && "name" in o
    && "coverImageUrl" in o
    && "itemPrice" in o
    && "amount" in o;

    if(hasCorrectProperties) {
        return typeof(o.productId) === "number"
        && typeof(o.name) === "string"
        && (!o.coverImageUrl || typeof(o.coverImageUrl) === "string")
        && typeof(o.itemPrice) === "number"
        && typeof(o.amount) == "number";
    }

    return false;
}
