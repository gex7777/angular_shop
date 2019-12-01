import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProductShareService {
  private dataSource = new BehaviorSubject<any[]>([]);
  currentMessage = this.dataSource.asObservable();

  constructor() {}
  changeMessage(message: any[]) {
    this.dataSource.next(message);
  }
}
