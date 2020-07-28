import { Component, OnInit } from '@angular/core';
import { ingredient } from '../shared/Ingredient.model';
import { shoppinglistService } from './Shoppinglist.service'

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
  
   
})
export class ShoppinglistComponent implements OnInit {
  ingredients:ingredient[]=[];
  

  constructor(private slservice:shoppinglistService) { 
    
  }

  ngOnInit() {
    this.ingredients=this.slservice.GetIngredient(); 
    
    this.slservice.ingredientschanged.subscribe((ingredients:ingredient[])=>{this.ingredients=ingredients;console.log(ingredient);})
  }

  OnEditItem(index:number)
  {
    this.slservice.startedEditing.next(index);
   
  }
 

}
