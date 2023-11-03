import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

constructor(private router:Router, public log:LoginService){}


logout(){
  localStorage.removeItem('token')
  this.log.IsLoggedIn.next(false)
  this.log.IsAdmin.next(false)
  this.router.navigate(['/login'])
}

}
