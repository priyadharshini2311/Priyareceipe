import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceipesComponent } from './receipes/receipes.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ReceipeStartComponent } from './receipes/receipe-start/receipe-start.component';
import { ReceipeDetailComponent } from './receipes/receipe-detail/receipe-detail.component';
import { ReceipeEditComponent } from './receipes/receipe-edit/receipe-edit.component';
import { ReceipeResolveService } from './receipes/receipe-resolver.service';
import { AuthcomponentComponent } from './Auth/authcomponent/authcomponent.component';


const routes: Routes = [
  {path:'',redirectTo:'/receipes',pathMatch:'full'},
  {path:'Shoppinglist',component:ShoppinglistComponent},
  {path:'receipes',component:ReceipesComponent,children:[{path:"",component:ReceipeStartComponent},
  {path:"new",component:ReceipeEditComponent},
  {path:":id",component:ReceipeDetailComponent,resolve:[ReceipeResolveService]},
  {path:":id/edit",component:ReceipeEditComponent,resolve:[ReceipeResolveService]}]},
  {path:"login",component:AuthcomponentComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{


 }
