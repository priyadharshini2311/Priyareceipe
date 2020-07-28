import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { receipe } from '../receipe.Model';
import { ingredient } from 'src/app/shared/Ingredient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { receipeService } from '../receipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit,OnDestroy {
 // @Output() Receipelistsel =new EventEmitter<receipe>();
 subscription:Subscription;

  receipes:receipe[];
   constructor(private router:Router,private route:ActivatedRoute,private receipeservice:receipeService) { }

  ngOnInit() {

    this.subscription=this.receipeservice.recceipechanged.subscribe((receipe:receipe[])=>{
      this.receipes=receipe;      
    });
    this.receipes=this.receipeservice.Getreceipe();
    console.log(this.receipes);
  }
  OnReceipeselected(receipe:receipe)
  {
   //this.Receipelistsel.emit(receipe);
   console.log(receipe);
  }
  onselect()
  {
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
  
}
