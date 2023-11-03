import { Component } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { repeat } from 'rxjs';
import { IUser } from 'src/app/Interfaces/iuser';
import { LoginService } from 'src/app/Services/login.service';
import { UserService } from 'src/app/Services/user.service';
import { BlockLike } from 'typescript';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

IsRepeated :boolean = false;

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
        username:['',[Validators.required, Validators.pattern(/^[a-z][a-z1-9]{3,}$/)]],
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

    get userRequired():boolean|void{return this.formgroup.get('username')?.hasError('required');}
    get userValid(): boolean|void {return this.formgroup.get ('username')?.valid;}
    get userTouched():boolean|void{ return this.formgroup.get('username')?.touched;}

    onSubmit(e:Event){

          e.preventDefault();

          if ( this.formgroup.valid)
          {

            this.user.email    = this.formgroup.get('email')?.value;
            this.user.username = this.formgroup.get('username')?.value;
            this.user.password = this.formgroup.get('password')?.value;


            this.userApi.getbymail(this.user).subscribe(
              async d => {
                if ( d[0] != undefined)
                {
                  this.IsRepeated = true;
                }
                else
                {
                  this.IsRepeated = false;
                  let text: string = this.formgroup.get('password')?.value + this.formgroup.get('email')?.value;
                  const encoder = new TextEncoder();
                  const data = encoder.encode(text);
                  const buffer = await crypto.subtle.digest('SHA-256', data);
                  const hashArray = Array.from(new Uint8Array(buffer));
                  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
                  this.user.password = hashHex;
                  this.userApi.addUser(this.user).subscribe( d=>
                    {
                      this.log.login(d.id).subscribe();
                      this.log.IsLoggedIn.next(true)
                      this.router.navigate(['/home'])
                    }

                  );



                }
            })


          }
    }
}
