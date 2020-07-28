import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './authcomponent/User.model';

export interface AuthResponse{
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
    }

@Injectable({providedIn:'root'})
export class AuthService 
{
 
 user =new BehaviorSubject<User>(null);
 constructor(private http:HttpClient)
 {}
 signUP(email:string,password:string)
 {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBt3zFA0mA8R13HWPhloBrniIJ-mBwaqsU',
   {email:email,
    password:password,
    returnSecureToken:true
 }).pipe(catchError(this.HandleError),tap((resdata)=>{this.HandleAuthenticate(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn)}));
 }

 Login(email:string,password:string)
 {
   return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBt3zFA0mA8R13HWPhloBrniIJ-mBwaqsU',
   {  email:email,
    password:password,
    returnSecureToken:true
   }).pipe(catchError(this.HandleError),tap((resdata)=>{this.HandleAuthenticate(resdata.email,resdata.localId,resdata.idToken,+resdata.expiresIn)}));
 }

 private HandleAuthenticate(email:string,localId:string,idToken:string,expiresIn:number)
 {
    const expirationdate = new Date(new Date().getTime() + +expiresIn*1000);
    const user =new User(email,localId,idToken,expirationdate);
    this.user.next(user);
 }
 
  private HandleError(errorres:HttpErrorResponse)
 {
    let errormessage ="An Unknown error  occured"
    if(!errorres.error || !errorres.error.error)
    {
        return throwError(errormessage);
    }
        switch(errorres.error.error.message)
        {
             case 'EMAIL_EXISTS':
                  errormessage ="The email already exists";
                break;
            case 'EMAIL_NOT_FOUND':
                errormessage ="The email user doesnot exist";
                 break;
            case 'INVALID_PASSWORD':
                errormessage ="The password entered is incorrect";
             break;

        }
        return throwError(errormessage);
 }

}

