import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { headerComponent } from './header/header.component';
import { ReceipesComponent } from './receipes/receipes.component';
import { ReceipeDetailComponent } from './receipes/receipe-detail/receipe-detail.component';
import { ReceipeItemComponent } from './receipes/receipe-list/receipe-item/receipe-item.component';
import { ReceipeListComponent } from './receipes/receipe-list/receipe-list.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ShoppingEditComponent } from './shoppinglist/shopping-edit/shopping-edit.component';
import {dropdownDirective} from './shared/dropdown.directive';
import { shoppinglistService } from './shoppinglist/Shoppinglist.service';
import { ReceipeStartComponent } from './receipes/receipe-start/receipe-start.component';
import { ReceipeEditComponent } from './receipes/receipe-edit/receipe-edit.component';
import { receipeService } from './receipes/receipe.service';
import {HttpClientModule} from '@angular/common/http';
import { AuthcomponentComponent } from './Auth/authcomponent/authcomponent.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    headerComponent,
    ReceipesComponent,
    ReceipeDetailComponent,
    ReceipeItemComponent,
    ReceipeListComponent,
    ShoppinglistComponent,
    ShoppingEditComponent,
    dropdownDirective,
    ReceipeStartComponent,
    ReceipeEditComponent,
    AuthcomponentComponent,
    LoadingSpinnerComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [shoppinglistService,receipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
