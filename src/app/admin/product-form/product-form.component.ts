import { pipe } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../product.service";
import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";
import { take } from "rxjs/operators";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;
  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getAll().valueChanges();
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .get(this.id)
        .valueChanges()
        .pipe(take(1))
        .subscribe(p => (this.product = p));
  }

  ngOnInit() {}
  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }
  delete() {
    if (!confirm("are you sure you want to delte this product")) return;
    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }
}
