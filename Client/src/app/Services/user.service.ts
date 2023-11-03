import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../Interfaces/iuser';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Token } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = "http://localhost:3000/users";

  checkUrl:string = "http://localhost:3000/users/?email="

  loginUrl:string = "http://localhost:3000/login/"

  constructor(private httpClient : HttpClient) { }

  // this function return array of products of type IUser
  GetAllUser():Observable<IUser[]>{
    return this.httpClient.get<IUser[]>(this.baseUrl);
  }

  GetUserById(id:number): Observable<IUser>{
    return this.httpClient.get<IUser>(this.baseUrl + "/" + id)
  }

  Edit(product:IUser): Observable<IUser>
  {
    return this.httpClient.put<IUser>(this.baseUrl +"/"+ product.id, product);
  }

  addUser(product :IUser):Observable<IUser>{
    return this.httpClient.post<IUser>(this.baseUrl, product);
  }

  delete(id:number):Observable<void>
  {
    return this.httpClient.delete<void>(this.baseUrl + "/" + id);
  }

  getbymail(user :IUser):Observable<IUser[]>{

    return this.httpClient.get<IUser[]>(this.checkUrl + user.email);
  }

  login(id:number):Observable<string>{
    return this.httpClient.get<string>(this.loginUrl+id)
  }

}
