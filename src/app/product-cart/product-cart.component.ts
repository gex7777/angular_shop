import { ShoppingCartService } from "./../shopping-cart.service";
import { Productsobj } from "./../shared/productsobj";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "product-cart",
  templateUrl: "./product-cart.component.html",
  styleUrls: ["./product-cart.component.scss"]
})
export class ProductCartComponent {
  @Input("product") product: Productsobj;
  @Input("showActions") showActions = true;
  @Input("shopping-cart") shoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Productsobj) {
    this.cartService.addToCart(product);
  }
  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.$key];

    return item ? item.quantity : 0;
  }
}
