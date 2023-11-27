import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Core/home/home.component';
import { NotfoundComponent } from './Components/Core/notfound/notfound.component';
import { ProductsComponent } from './Components/Core/products/products.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { RegisterComponent } from './Components/Core/register/register.component';
import { ContactsComponent } from './Components/Core/contacts/contacts.component';
import { ProductFormComponent } from './Components/Core/product-form/product-form.component';
import { DashboardComponent } from './Components/Core/dashboard/dashboard.component';
import { DetailsComponent } from './Components/Core/details/details.component';
import { authGuard } from './Guard/auth.guard';
import { CartComponent } from './Components/Core/cart/cart.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"products", component:ProductsComponent, canActivate: [authGuard]},
  {path:"product", component:ProductFormComponent, canActivate: [authGuard]},
  {path:"product/:id", component:ProductFormComponent, canActivate: [authGuard]},
  {path:"dashboard", component:DashboardComponent, canActivate: [authGuard]},
  {path:"details/:id", component:DetailsComponent, canActivate: [authGuard]},
  {path:"login",component:LoginComponent, canActivate: [authGuard]},
  {path:"signup", component:RegisterComponent, canActivate: [authGuard]},
  {path:"cart", component:CartComponent, canActivate: [authGuard]},
  {path:"contacts", component:ContactsComponent },
  {path:"", component:HomeComponent, canActivate: [authGuard]},
  {path:"**", component:NotfoundComponent, canActivate: [authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
