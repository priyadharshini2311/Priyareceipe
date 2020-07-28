import {ingredient} from '../shared/Ingredient.model';

export class receipe
{
 public receipename :string;
 public description :string;
 public ImgUrl:string;
 public ingredients : ingredient[];
 constructor(name: string,description: string,ImgUrl:string,ingredients:ingredient[])
 {
   this.receipename =name;
   this.description=description;
   this.ImgUrl=ImgUrl;
   this.ingredients=ingredients;
 }
 
}