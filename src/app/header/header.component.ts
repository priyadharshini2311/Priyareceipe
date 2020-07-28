import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../Auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../Auth/authcomponent/User.model';

@Component({
    selector :'app-header',
    templateUrl :'./header.component.html'
})

export class headerComponent implements OnInit,OnDestroy
{
   private usersubscription :Subscription;
   private IsAuthenticated = false;
   constructor(private datastorage:DataStorageService,private authservice:AuthService) 
   {
     
   }
   ngOnInit()
   {
     this.usersubscription = this.authservice.user.subscribe((user:User)=>{
       this.IsAuthenticated=!!user;
       console.log(user);
     })
   }
   StoreData()
   {
     this.datastorage.StoreReceipes();
   }
   FetchData()
   {
    this.datastorage.FetchReceipes().subscribe();
   }

   ngOnDestroy()
   {
     this.usersubscription.unsubscribe();
   }
    
}