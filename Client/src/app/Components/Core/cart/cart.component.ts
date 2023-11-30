import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { Iproductquantity } from 'src/app/Interfaces/iproductquantity';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products : IProduct[] = [];

  data: Iproductquantity[] = []


  constructor(private cartapi: CartService, private productapi:ProductService) { }

  ngOnInit(): void {

    // Get all cart products quantity
    this.cartapi.GettingAllUserCarts().subscribe({
      next: (d) => {
        this.data = d[0].products
      },
      error: (e) => console.log('Filed to get Cart: ', e),
      complete: () => {
        console.log('Got Cart Successfully!')

        this.data.forEach(element => {

          // Filling the products list
          this.productapi.GetProductById(element.productId).subscribe({
            next: (d) => this.products.push(d[0]),
            error: (e) => console.log('Unable to get product: ', e),
            complete: () => console.log(this.products)
          });

        });

      }
    });




  }



  DeleteFromCart(i : number){
    console.log(i)
  }

}
