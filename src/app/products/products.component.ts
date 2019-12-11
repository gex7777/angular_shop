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
  constructor(
    private productService: ProductService,
    private productShare: ProductShareService,
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

  ngOnInit() {
    this.productShare.currentMessage.subscribe(
      filteredp => (this.products = filteredp)
    );
    console.log(this.products);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
