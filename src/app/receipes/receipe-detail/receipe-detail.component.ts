import { Component, OnInit, Input } from '@angular/core';
import { receipe } from '../receipe.Model';
import { shoppinglistService } from 'src/app/shoppinglist/Shoppinglist.service';
import {receipeService} from '../receipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
  receipe:receipe;
  id:number;

  constructor(private receieservice:receipeService,private route:ActivatedRoute,private router:Router) {
    
   }

  ngOnInit() {
    //const id=this.route.snapshot.params['id'];
    this.route.params.subscribe((params:Params)=>{this.id=+params['id'];this.receipe=this.receieservice.Getsinglereceipe(this.id);});
    
    console.log(this.receipe);
  }
  onAddToshoppingList()
  {
    this.receieservice.AddingredientstoshoppingService(this.receipe.ingredients);
  }
  onEdit()
  {
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
  ondelete()
  {
    this.receieservice.DeleteReceipe(this.id);
    this.router.navigate(['/receipes']);
  }

}
