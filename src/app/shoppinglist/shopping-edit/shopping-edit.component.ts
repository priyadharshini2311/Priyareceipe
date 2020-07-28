import { Component, OnInit,Input, EventEmitter,Output, OnDestroy, ViewChild } from '@angular/core';
import { ingredient } from '../../shared/Ingredient.model';
import { shoppinglistService } from '../Shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false}) slform:NgForm;
  ingredient:ingredient;
  @Output() Newingredientadded =new EventEmitter<ingredient>();
  subscription:Subscription;
  Editmode=false;
  Editeditemindex:number;
  Editeditem:ingredient;


  constructor(private slservice:shoppinglistService) { }

  ngOnInit() {
    this.subscription =this.slservice.startedEditing.subscribe((index:number)=>
    {
     this.Editmode=true;
     this.Editeditemindex=index;
     this.Editeditem=this.slservice.GetIngredients(index);
     this.slform.setValue({
       name:this.Editeditem.name,
       amount:this.Editeditem.amount
     })

    });
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  OnAddingredient(form:NgForm)
  {
    const value=form.value;
    console.log(value);
    this.ingredient=new ingredient(value.name,value.amount);
    if(this.Editmode)
    {
      this.slservice.UpdateIngredient(this.Editeditemindex,this.ingredient);
    }
    else
    {
          this.slservice.AddIngredient(this.ingredient);
    }
    form.reset();
    this.Editmode=false;
  
  }
  onclear()
  {
    this.Editmode=false;
    this.slform.reset();
  
  }
  ondelete()
  {
    
    this.slservice.DeleteIngredient(this.Editeditemindex);
    this.onclear();
    console.log(this.Editeditemindex);
  }

 

}
