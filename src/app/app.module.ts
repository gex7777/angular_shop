import { ProductService } from "./product.service";
import { CategoryService } from "./category.service";
import { MatTableModule } from "@angular/material/table";
import {
  MatSortModule,
  MatSelectModule,
  MatInputModule
} from "@angular/material";
import { AdminAuthGuardService } from "./admin-auth-guard.service";
import { UserService } from "./user.service";
import { AuthGuardService } from "./auth-guard.service";
import { AuthService } from "./auth.service";
import { LoginComponent } from "./login/login.component";
import { Router, RouterModule } from "@angular/router";
import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  MdcTopAppBarModule,
  MdcIconModule,
  MdcListModule,
  MdcMenuModule,
  MdcDrawerModule,
  MdcButtonModule,
  MdcElevationModule
} from "@angular-mdc/web";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MdcNavbarComponent } from "./mdc-navbar/mdc-navbar.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    MdcNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MdcTopAppBarModule,
    MdcIconModule,
    MdcListModule,
    MdcMenuModule,
    MdcButtonModule,
    MdcDrawerModule,
    MdcElevationModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "products", component: ProductsComponent },
      { path: "shopping-cart", component: ShoppingCartComponent },
      { path: "login", component: LoginComponent },
      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "order-success",
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService]
      },

      {
        path: "admin/products",
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: "admin/products/new",
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: "my-orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      }
    ]),
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
