import { Injectable } from '@angular/core';
import { receipe } from './receipe.Model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';



@Injectable({providedIn:'root'})
export class ReceipeResolveService implements Resolve <receipe[]>
{
    constructor(private datastorageservice:DataStorageService){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)
    {
      return this.datastorageservice.FetchReceipes();
    }

}