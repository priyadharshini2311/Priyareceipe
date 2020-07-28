import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { receipeService } from '../receipes/receipe.service';
import { receipe } from '../receipes/receipe.Model';
import {map,tap, take, exhaustMap} from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';
import { User } from '../Auth/authcomponent/User.model';

@Injectable({providedIn:'root'})
export class DataStorageService
{
  constructor(private http:HttpClient,private receipeservicce:receipeService,private authservice:AuthService)
  {

  }

  StoreReceipes()
  {
      const receipes= this.receipeservicce.Getreceipe();
      return this.http.put('https://ng-course-receipe-book-8940b.firebaseio.com/receipes.json',receipes).subscribe((response)=>{
          console.log(response);
      })

  }

  FetchReceipes()
  {
    return this.authservice.user.pipe(take(1),exhaustMap((user:User)=>{return this.http.get<receipe[]>('https://ng-course-receipe-book-8940b.firebaseio.com/receipes.json',
    {params :new HttpParams().set('auth',user.token)}
    )}),map(receipes=>{
        return receipes.map(receipe=>{
            return {...receipe,ingredients:receipe.ingredients?receipe.ingredients:[]}

        })
    }),tap(receipes =>{
        this.receipeservicce.setReceipes(receipes);}

    ) 
    
    );
     
  }

}