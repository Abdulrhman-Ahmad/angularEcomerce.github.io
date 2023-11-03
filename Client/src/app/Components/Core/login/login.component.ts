import { jwtDecode } from 'jwt-decode';
import { UserService } from './../../../Services/user.service';
import {Validators, FormGroup, FormBuilder, CheckboxControlValueAccessor} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../Interfaces/iuser';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../Shared/header/header.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

user:IUser = {
  address: {
    geolocation: {
      lat: "",
      long: ""
    },
    city: "",
    street: "",
    number: 0,
    zipcode: ""
  },
  id: 0,
  email: "",
  username: "",
  password: "",
  name: {
    firstname: "",
    lastname: ""
  },
  phone: "",
  __v: 0
};

  constructor(private fb :FormBuilder, private userApi:UserService, private log:LoginService, private router:Router){}

  formgroup!:FormGroup;
  ngOnInit(): void {
    this.formgroup = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(4)]]
    })
  }

  get emailRequired():boolean|void{return this.formgroup.get('email')?.hasError('required');}
  get emailValid(): boolean|void { return this.formgroup.get('email')?.valid;}
  get emailTouched():boolean|void{ return this.formgroup.get('email')?.touched;}

  get passRequired():boolean|void{return this.formgroup.get('password')?.hasError('required');}
  get passValid(): boolean|void {return this.formgroup.get ('password')?.valid;}
  get passTouched():boolean|void{ return this.formgroup.get('password')?.touched;}


   onSubmit(e:Event){
    e.preventDefault();
    if ( this.formgroup.valid)
    {


      this.user.email = this.formgroup.get('email')?.value;


      this.userApi.getbymail(this.user).subscribe(
        async d => {
          if ( d[0] != undefined)
          {


            let text: string =  this.formgroup.get('password')?.value + this.user.email
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const buffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(buffer));
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            this.user.password = hashHex;

            if(d[0].password == this.user.password)
            {
              // if the login is matched get an JWT from ther server
              this.log.login(d[0].id).subscribe();
              this.log.IsLoggedIn.next(true)
              this.router.navigate(['/home'])
            }

            else
            {
              // wrong pass
            }

          }
          else
          {
            // email is not existed
          }
      })
    }
    else
    {
      // data is not filled
    }

  }


}
