import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Shared/header/header.component';
import { FooterComponent } from './Components/Shared/footer/footer.component';

import { HomeComponent } from './Components/Core/home/home.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './Components/Core/products/products.component';
import { NotfoundComponent } from './Components/Core/notfound/notfound.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { RegisterComponent } from './Components/Core/register/register.component';
import { ContactsComponent } from './Components/Core/contacts/contacts.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from './Components/Core/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './Components/Core/dashboard/dashboard.component';
import { DetailsComponent } from './Components/Core/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    ContactsComponent,
    ProductFormComponent,
    DashboardComponent,
    DetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,



  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
