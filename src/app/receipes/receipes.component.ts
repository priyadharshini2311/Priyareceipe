import { Component, OnInit } from '@angular/core';
import { receipe } from './receipe.Model';
import { receipeService } from './receipe.service';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css']
 
})
export class ReceipesComponent implements OnInit {
  selectedReceipe:receipe;

  constructor(private receipeservice:receipeService) { 
   
  }

  ngOnInit() {
    this.receipeservice.receipeselected.subscribe((receipe:receipe)=>{this.selectedReceipe=receipe;console.log(this.selectedReceipe);})
    
    
  }

}
