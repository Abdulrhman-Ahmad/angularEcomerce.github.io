import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './Services/login.service';
import { jwtDecode } from 'jwt-decode';
import { IData } from './Interfaces/idata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ECommerce';
  constructor(private log:LoginService){}
  ngOnInit(){
    const jwt = localStorage.getItem('token')
    if(jwt)
    {
      this.log.IsLoggedIn.next(true);
      let token :IData= jwtDecode(jwt)
      let username = token.user
      if(username == 'admin')
      {
        this.log.IsAdmin.next(true);
      }
      this.log.username = username
    }
  }
}
