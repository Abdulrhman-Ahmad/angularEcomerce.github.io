import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl:string = "http://localhost:3000/products";

  constructor(private httpClient : HttpClient) { }

  jwt = localStorage.getItem('jwtToken');
  header = new HttpHeaders({Authorization : `Bearer ${this.jwt}`})
  options = { headers : this.header }


  // this function return array of products of type IProduct
  GetAllProducts():Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(this.baseUrl, this.options);
  }

  GetProductById(id:number): Observable<IProduct>{
    return this.httpClient.get<IProduct>(this.baseUrl + "/" + id)
  }

  Edit(product:IProduct): Observable<IProduct>
  {
    return this.httpClient.put<IProduct>(this.baseUrl +"/"+ product.id, product);
  }

  addProductr(product :IProduct):Observable<IProduct>{
    return this.httpClient.post<IProduct>(this.baseUrl, product);
  }

  delete(id:number):Observable<void>
  {
    return this.httpClient.delete<void>(this.baseUrl + "/" + id);
  }

}
