import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { format } from 'url';
import { AuthService,AuthResponse } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authcomponent',
  templateUrl: './authcomponent.component.html',
  styleUrls: ['./authcomponent.component.css']
})
export class AuthcomponentComponent implements OnInit {

  IsLogin = true;
  IsLoading=false;
  error:string =null;

  constructor(private authservice:AuthService,private router:Router) { }

  ngOnInit() {
    
  }

  OnSwitch()
  {
    this.IsLogin =!this.IsLogin;
  }

  OnSubmit(authform:NgForm)
  {
    if(!authform.valid)
    {
      return;
    }

    const email =authform.value.email;
    const password =authform.value.password;
    this.IsLoading=true;
    let authobs:Observable<AuthResponse>

    if(!this.IsLogin)
    {
      this.authservice.Login(email,password).subscribe(resdata =>{
        console.log(resdata);
        this.IsLoading=false;
        this.router.navigate(['/receipes'])
        },errormsg=>{
        //console.log(error);
        this.IsLoading=false;
        this.error=errormsg;
      });     
  
    }
    else{

      this.authservice.signUP(email,password).subscribe(resdata =>{
        console.log(resdata);
        this.IsLoading=false;
        this.router.navigate(['/receipes']);
        },errormsg=>{
        //console.log(error);
        this.IsLoading=false;
        this.error=errormsg;
      });
  
    }
   
    authform.reset();

    
  }

}
