import { ShoppingCart } from "./../shared/shopping-cart";
import { ShoppingCartService } from "./../shopping-cart.service";
import { ProductShareService } from "./../product-share.service";
import { ProductService } from "./../product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Productsobj } from "../shared/productsobj";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products = [];
  category: any;
  subscription: any;
  cart: unknown;
  subscription2: any;
  shoppingCartItemCount: number;
  constructor(
    private productService: ProductService,
    private productShare: ProductShareService,
    private shoppingCartService: ShoppingCartService,
    route: ActivatedRoute
  ) {
    this.subscription = this.productService
      .getAll()
      .snapshotChanges()
      .subscribe(books => {
        books.forEach(item => {
          let a = item.payload.toJSON();
          a["$key"] = item.key;
          this.products.push(a as Productsobj);
        });
      });
  }

  async ngOnInit() {
    this.productShare.currentMessage.subscribe(
      filteredp => (this.products = filteredp)
    );
    this.subscription2 = (await this.shoppingCartService.getCart())
      .valueChanges()
      .subscribe(cart => (this.cart = cart));
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe((cart: ShoppingCart) => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
