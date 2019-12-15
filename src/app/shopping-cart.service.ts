import { Productsobj } from "./shared/productsobj";
import { async } from "@angular/core/testing";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { promise } from "protractor";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  product: unknown;
  constructor(private db: AngularFireDatabase) {}

  private create(): Promise<any> {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }
  getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }
  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId);
  }
  async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem("cartId", result.key);
      return result.key;
    }
    return cartId;
  }
  async addToCart(product: Productsobj) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((p: any) => {
        if (p) item$.update({ quantity: p.quantity + 1 });
        else item$.set({ productName: product.title, quantity: 1 });
      });
  }
}
