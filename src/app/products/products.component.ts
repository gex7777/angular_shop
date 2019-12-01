import { ProductShareService } from "./../product-share.service";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { Productsobj } from "../shared/productsobj";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products = [];

  constructor(
    private productService: ProductService,
    private productShare: ProductShareService
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

    this.productShare.currentMessage.subscribe(
      filteredp => (this.products = filteredp)
    );
    this.productShare.currentMessage.subscribe(
      filteredp => (this.products = filteredp)
    );
    console.log(this.products);
  }
  //applyFilter(filterValue: string) {
  //  this.filteredProducts = filterValue
  //    ? this.products.filter(p =>
  //        p.title.toLowerCase().includes(filterValue.toLowerCase())
  //      )
  ////    : this.products;
  // }
  ngOnInit() {
    this.productShare.currentMessage.subscribe(
      filteredp => (this.products = filteredp)
    );
    console.log(this.products);
  }
}
