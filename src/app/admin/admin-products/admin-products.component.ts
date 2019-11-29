import { Productsobj } from "./../../shared/productsobj";
import { MatTableDataSource } from "@angular/material/table";
import { ProductService } from "./../../product.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material";
@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.scss"]
})
export class AdminProductsComponent implements OnInit {
  products: any = [];
  filteredProducts: any[];
  dataSource: MatTableDataSource<Productsobj>;
  displayedColumns: string[] = ["title", "price", "link"];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  subscription: any;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .snapshotChanges()
      .subscribe(books => {
        books.forEach(item => {
          let a = item.payload.toJSON();
          a["$key"] = item.key;
          this.products.push(a as Productsobj);
        });
        this.filteredProducts = this.products;
        this.dataSource = new MatTableDataSource(this.filteredProducts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  applyFilter(filterValue: string) {
    this.filteredProducts = filterValue
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(filterValue.toLowerCase())
        )
      : this.products;
    this.dataSource = new MatTableDataSource(this.filteredProducts);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
