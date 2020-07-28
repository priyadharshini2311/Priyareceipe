import { Component, OnInit, Input } from '@angular/core';
import { receipe } from '../../receipe.Model';



@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css']
})
export class ReceipeItemComponent implements OnInit {
  @Input() receipeli:receipe;
  @Input() index:number;
  
  
  constructor() { }

  ngOnInit() {
  }
 
  

}
