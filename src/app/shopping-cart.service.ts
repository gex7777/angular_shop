import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { promise } from "protractor";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}
  create(): Promise<any> {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }
}
