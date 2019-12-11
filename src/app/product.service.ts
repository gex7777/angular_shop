import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;
  packageBookingList;
  constructor(private db: AngularFireDatabase) {}
  /*create product*/
  create(product) {
    return this.db.list("/products").push(product);
  }
  getAll() {
    return this.db.list("/products");
  }
  get(productId) {
    return this.db.object("/products/" + productId);
  }
  update(productId, product) {
    this.db.object("/products/" + productId).update(product);
  }
  delete(productId) {
    return this.db.object("/products/" + productId).remove();
  }
}
