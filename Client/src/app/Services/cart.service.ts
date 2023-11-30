import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../Interfaces/iuser';
import { Iproductbyid } from '../Interfaces/iproductbyid';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  BaseUrl: string = "http://localhost:3000/carts"

  constructor(private httpclient: HttpClient) { }

  // Get all cart products for the logged in user
  GettingAllUserCarts(): Observable<Iproductbyid[]> {

    let token = localStorage.getItem('token');

    if (token) {

      // Getting Token Claims
      let user: IUser = JSON.parse(atob(token.split('.')[1]));

      // Create httpparams and assign the userid to it
      let params = new HttpParams();
      params = params.set('userId', user.id);

      return this.httpclient.get<Iproductbyid[]>(this.BaseUrl, { params })
    }

    console.log('User not logged in!');
    // Returning Empty Array in Case no Tokens Found => Not logged in
    return of([]);
  }

  DeleteFromCart(id :number) : Observable<void>{

    let params = new HttpParams();
    params = params.set('id', id)

    return this.httpclient.delete<void>(this.BaseUrl, {params} )

  }

}
