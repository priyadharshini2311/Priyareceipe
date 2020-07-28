import {ingredient} from '../shared/Ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export class shoppinglistService

{
  ingredientschanged =new Subject<ingredient[]>();
  ingredients:ingredient[]=[new ingredient('Toor dal',200),new ingredient('onion',2)];
  startedEditing =new Subject<number>();

  GetIngredient()
  {
      return this.ingredients.slice();
  }
  GetIngredients(index:number)
  {
    return this.ingredients[index];
  }

  AddIngredient(ing:ingredient)
  {
   this.ingredients.push(ing);
   this.ingredientschanged.next(this.ingredients.slice());
   console.log(ing);
  }
   
  AddIngredients(ingredients:ingredient[])
  {
      this.ingredients.push(...ingredients);
      this.ingredientschanged.next(this.ingredients.slice());
  }
  UpdateIngredient(index:number,newIngredient:ingredient)
  {
    this.ingredients[index]=newIngredient;
    this.ingredientschanged.next(this.ingredients.slice());
  }

  DeleteIngredient(index:number)
  {
    this.ingredients.splice(index,1);
    this.ingredientschanged.next(this.ingredients.slice());
    
  }
  
}
