import { ProductShareService } from "./../product-share.service";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { Productsobj } from "../shared/productsobj";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products = [];
  category: any;

  constructor(
    private productService: ProductService,
    private productShare: ProductShareService,
    route: ActivatedRoute
  ) {
    this.productService
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
}
