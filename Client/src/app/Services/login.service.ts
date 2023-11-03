import { jwtDecode } from 'jwt-decode';
import { Token } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IData } from '../Interfaces/idata';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

//a special type of observable in RxJS, that keeps track of the current value and emits it to new subscribers

  baseUrl:string = "http://localhost:3000/login/";

  constructor(private http:HttpClient) { }
  IsLoggedIn = new BehaviorSubject<boolean>(false)
  IsAdmin = new BehaviorSubject<boolean>(false)
  username:string = ''

  login(id:number):Observable<any>{
    return this.http.get<any>(this.baseUrl + id).pipe(tap((res :any)=>
    {
      localStorage.setItem('token',res)
      let token : IData = jwtDecode(res)
      this.username = token.user;   /// I'm here trying to take put the username beside the login button in the header navbar
        if (token.user == 'admin')
          {
            this.IsAdmin.next(true)
          }
    }))
  }

}
