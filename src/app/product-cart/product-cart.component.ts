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
  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Productsobj) {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      this.cartService.create().then(result => {
        localStorage.setItem("cartId", result.key);
      });
    }
  }
}
