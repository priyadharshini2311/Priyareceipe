import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { receipeService } from '../receipe.service';
import { ingredient } from 'src/app/shared/Ingredient.model';
import { receipe } from '../receipe.Model';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css']
})
export class ReceipeEditComponent implements OnInit {
  id:number;
  editmode=false;
  ReceipeForm : FormGroup

  constructor(private route:ActivatedRoute,private receipeservice:receipeService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{this.id=+params['id'];
    this.editmode=params['id']!=null;
    this.initForm();
  })  

  }
  private initForm()
  {

    let receipename="";
    let receipeImgPath="";
    let receipedescription="";
    let receipeIngredients=new FormArray([]);

    if(this.editmode)
    {
     const receipe= this.receipeservice.Getsinglereceipe(this.id);
     receipename =receipe.receipename;
     receipeImgPath =receipe.ImgUrl;
     receipedescription =receipe.description;
     if(receipe['ingredients'])
     {
       for (let ingredient of receipe.ingredients)
       {
        receipeIngredients.push(new FormGroup({
          'name':new FormControl(ingredient.name,Validators.required),
          'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
      }
     }
    }
    this.ReceipeForm =new FormGroup({
      'name' :new FormControl(receipename,Validators.required),
      'imagepath' : new FormControl(receipeImgPath,Validators.required),
      'description':new FormControl(receipedescription,Validators.required),   
       'ingredients':receipeIngredients

    });
  }
  onsubmit()
  {

    const newReceipe =new receipe(
      this.ReceipeForm.value['name'],
      this.ReceipeForm.value['description'],
      this.ReceipeForm.value['imagepath'],      
      this.ReceipeForm.value['ingredients'],)

    if(!this.editmode)
    {
    this.receipeservice.AddRecceipe((newReceipe));
    }
    else
    {
      this.receipeservice.EditReceipe(this.id,newReceipe);
    }
    this.onCancel();
    
  }
  // get controls() { // a getter!
  //   return (<FormArray>this.ReceipeForm.get('ingredients')).controls;
  // }

  OnAddIngredient()
  {
    (<FormArray>this.ReceipeForm.get('ingredients')).push(
      new FormGroup(
        {
          'name': new FormControl(null,Validators.required),
          'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]) 
        }
      )
    );
  }

  onCancel()
  {
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  OnDeleteIngredient(index:number)
  {
    (<FormArray>this.ReceipeForm.get('ingredients')).removeAt(index);
  }

}
