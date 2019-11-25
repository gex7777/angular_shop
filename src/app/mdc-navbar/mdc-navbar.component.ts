import { AuthService } from "./../auth.service";
import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MdcDrawer, MdcTopAppBar, MdcMenu } from "@angular-mdc/web";
const SMALL_WIDTH_BREAKPOINT = 1240;
@Component({
  selector: "mdc-navbar",
  templateUrl: "./mdc-navbar.component.html",
  styleUrls: ["./mdc-navbar.component.scss"]
})
export class MdcNavbarComponent implements OnInit {
  matcher: MediaQueryList;
  @ViewChild("topAppBar", { static: false }) topAppBar: MdcTopAppBar;
  @ViewChild("appDrawer", { static: false }) appDrawer: MdcDrawer;

  constructor(
    private _router: Router,
    private _ngZone: NgZone,
    public auth: AuthService
  ) {}

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
