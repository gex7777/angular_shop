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
import { Router } from "@angular/router";
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
  categories$;

  products: any = [];
  constructor(
    private categoryService: CategoryService,
    private _router: Router,
    private productService: ProductService,

    private auth: AuthService
  ) {
    auth.AppUser$.subscribe(appUser => (this.appUser = appUser));
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
    this.categories$ = this.products.filter(
      distinct((p: Productsobj) => p.category)
    );
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
