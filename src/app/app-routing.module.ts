import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
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

const routes: Routes = [
  {path: 'nav', component: NavComponent},
  {path: 'showhidepassword', component: ShowHidePasswordComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'adminlogin', component: AdminComponent},
  {path: 'adminlogin/dashboard/product', component: ProductListComponent},
  {path: 'adminlogin/dashboard/product/add_product', component: AddProductComponent},
  {path: 'login/product-detail/:productId', component: ProductDetailsComponent},
  {path: 'login/search', component: SearchComponent},
  {path: 'login/cart', component: CartComponent},
  {path: 'login/cart/placeorder', component: PlaceOrderComponent},
  {path: 'adminlogin/dashboard/product/edit_product/:productId', component: EditProductComponent},
  {path: 'adminlogin/dashboard/user', component: UsersListComponent},
  {path: 'login/myprofile/:userId', component: EditProfileComponent},
  {path: 'login/cartEdit/:productId', component: EditCartProductComponent},
  {path: 'adminlogin/dashboard/category', component: CategoryComponent},
  {path: 'adminlogin/dashboard/category/addcategory', component: AddCategoryComponent},
  {path: 'adminlogin/dashboard/category/edit-category/:id', component: EditCategoryComponent},
  {path: 'login/myOrder/:id', component: UserOrderListComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
