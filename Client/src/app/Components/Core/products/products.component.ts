import { ProductService } from './../../../Services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../../Interfaces/iproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
products !:IProduct[];

constructor(private productsApi : ProductService){}

ngOnDestroy(): void {
}
ngOnInit(): void {
  this.productsApi.GetAllProducts().subscribe( data => this.products = data );
}



}
