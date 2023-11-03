import { ProductService } from './../../../Services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../../Interfaces/iproduct';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

productsList !: IProduct[];
subscription !: Subscription ;

constructor(private api : ProductService, private router:Router){}

ngOnInit(): void {
  this.subscription = this.api.GetAllProducts().subscribe(data => this.productsList = data);
}

ngOnDestroy():void {

  if ( ! this.subscription.closed )
  this.subscription.unsubscribe();

}

delete(i :number){
  this.api.delete(i).subscribe();
  this.productsList = this.productsList.filter(e=> e.id != i)
}

}
