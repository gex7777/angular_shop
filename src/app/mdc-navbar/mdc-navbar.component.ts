import { ProductShareService } from "./../product-share.service";
import { Productsobj } from "./../shared/productsobj";
import { pipe } from "rxjs";
import { ProductService } from "./../product.service";

import { CategoryService } from "./../category.service";
import { AppUser } from "./../models/app-user";
import { AuthService } from "./../auth.service";
import {
  Component,
  OnInit,
  ViewChild,
  HostBinding,
  Input
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MdcDrawer, MdcTopAppBar, MdcMenu } from "@angular-mdc/web";

import { distinct } from "rxjs/operators";
const SMALL_WIDTH_BREAKPOINT = 1240;
@Component({
  selector: "mdc-navbar",
  templateUrl: "./mdc-navbar.component.html",
  styleUrls: ["./mdc-navbar.component.scss"]
})
export class MdcNavbarComponent implements OnInit {
  matcher: MediaQueryList;
  appUser: AppUser;

  @ViewChild("topAppBar", { static: false }) topAppBar: MdcTopAppBar;
  @ViewChild("appDrawer", { static: false }) appDrawer: MdcDrawer;
  categories$: any = [];

  products: any = [];
  filteredProducts: any[];
  category: string;
  constructor(
    private categoryService: CategoryService,
    private _router: Router,
    private productService: ProductService,
    private productShare: ProductShareService,
    route: ActivatedRoute,

    private auth: AuthService
  ) {
    auth.AppUser$.subscribe(appUser => (this.appUser = appUser));
    this.categoryService
      .getAll()
      .snapshotChanges()
      .subscribe(books => {
        books.forEach(item => {
          let a = item.payload.toJSON();
          a["$key"] = item.key;
          this.categories$.push(a as Productsobj);
        });
      });
    this.productService
      .getAll()
      .snapshotChanges()
      .subscribe(books => {
        books.forEach(item => {
          let a = item.payload.toJSON();
          a["$key"] = item.key;
          this.products.push(a as Productsobj);
        });

        route.queryParamMap.subscribe(params => {
          this.category = params.get("category");
          this.applyFilter(this.category);
        });
      });
  }
  applyFilter(filterValue: string) {
    this.filteredProducts = filterValue
      ? this.products.filter(p =>
          p.category.toLowerCase().includes(filterValue.toLowerCase())
        )
      : this.products;

    this.productShare.changeMessage(this.filteredProducts);
    this.ngOnInit();
  }

  isScreenSmall(): boolean {
    return this.matcher.matches;
  }
  ngOnInit() {
    this.matcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  }
  logout() {
    this.auth.logout();
  }
  onDrawerSelect(route?: string) {
    if (route) {
      this._router.navigate([route]);
    }

    if (this.isScreenSmall()) {
      this.appDrawer.open = false;
    }
  }
}
