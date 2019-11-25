import { Observable, pipe } from "rxjs";

import { map, switchMap } from "rxjs/operators";
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid).valueChanges()),
      map(appUser => appUser.isAdmin)
    );
  }
}
