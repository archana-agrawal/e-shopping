import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {IonicModule} from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UsersListComponent } from './users-list/users-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditCartProductComponent } from './edit-cart-product/edit-cart-product.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { UserOrderListComponent } from './user-order-list/user-order-list.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    FooterComponent,
    AdminComponent,
    SearchComponent,
    DashboardComponent,
    ProductListComponent,
    AddProductComponent,
    ProductDetailsComponent,
    CartComponent,
    PlaceOrderComponent,
    EditProductComponent,
    UsersListComponent,
    EditProfileComponent,
    EditCartProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    UserOrderListComponent,
    ShowHidePasswordComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    Ng2SearchPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
