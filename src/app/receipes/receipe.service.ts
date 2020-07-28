import { receipe } from './receipe.Model';
import {  Injectable } from '@angular/core';
import { ingredient } from '../shared/Ingredient.model';
import { shoppinglistService } from '../shoppinglist/Shoppinglist.service';
import { Subject } from 'rxjs';

@Injectable()
export class receipeService
{
  recceipechanged =new Subject<receipe[]>();

    constructor(private slservice:shoppinglistService)
    {}
    receipeselected = new Subject<receipe>();
    private receipes:receipe[]=[];
    //receipes:receipe[] =[new receipe('Sambar','Lentil soup','https://www.indianhealthyrecipes.com/wp-content/uploads/2012/07/sambar.jpg',[new ingredient('tomato',2),new ingredient('raddish',2)]),
    //new receipe('Dosa','Indian pancake','https://miro.medium.com/max/940/0*NsaoQuhkfTvO-h40.',[new ingredient('rice',2),new ingredient('urad dal',2)])];
    
    Getreceipe()
    {
        return this.receipes.slice();
    }
    AddingredientstoshoppingService(ingredients:ingredient[])
    {
      this.slservice.AddIngredients(ingredients);
    }

    Getsinglereceipe(id:number)
    {
      return this.receipes[id];
    }

    AddRecceipe(receipe:receipe)
    {
      this.receipes.push(receipe);
      this.recceipechanged.next(this.receipes);
      console.log(this.receipes);
    }

    EditReceipe(index:number,receipe:receipe)
    {
      this.receipes[index]=receipe;
      this.recceipechanged.next(this.receipes);
      console.log(this.receipes);
    }

    DeleteReceipe(index:number)
    {
      this.receipes.splice(index,1);
      this.recceipechanged.next(this.receipes.slice());
    }

    setReceipes(recceipes:receipe[])
    {
      this.receipes=recceipes;
      this.recceipechanged.next(this.receipes.slice());
    }
}