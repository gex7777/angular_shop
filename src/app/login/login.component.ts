import { AuthService } from "./../auth.service";

import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  constructor(public auth: AuthService) {}

  login() {
    this.auth.login();
  }
}
