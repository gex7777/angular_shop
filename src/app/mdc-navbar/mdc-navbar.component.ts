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
  constructor(private _router: Router, private _ngZone: NgZone) {}
  destinations = [
    { label: "My Orders", icon: "card_giftcard", activated: true }
  ];
  fruits = [
    { label: "Passionfruit" },
    { label: "Orange" },
    { label: "Guava" },
    { label: "Pitaya" },
    { label: null }, // The html uses ngSwitchCase to check for a null label, and displays mdc-list-divider
    { label: "Pinaeapple" },
    { label: "Mango" },
    { label: "Papaya" },
    { label: "Lychee" }
  ];

  text = `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, incidunt. Debitis,
  repudiandae dignissimos et quam velit autem mollitia tenetur,
  eligendi rerum repellendus, explicabo ad aperiam vel ipsam! Exercitationem, voluptates molestiae.
  Iusto reiciendis mollitia ab commodi. Animi maiores nesciunt officia enim corrupti officiis consequuntur vel,
  consectetur eveniet ad dolorum reprehenderit similique qui deleniti ut sed explicabo id error at. Laudantium,
  excepturi!`;
  lorems = Array(5).fill(this.text);

  isScreenSmall(): boolean {
    return this.matcher.matches;
  }
  ngOnInit() {
    this.matcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
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
