import { MatTableDataSource } from "@angular/material/table";
import { ProductService } from "./../../product.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.scss"]
})
export class AdminProductsComponent implements OnInit {
  products$;
  displayedColumns: string[] = ["title", "price", "link"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
    console.log(this.products$);
  }

  ngOnInit() {}
}
