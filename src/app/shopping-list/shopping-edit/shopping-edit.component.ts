import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, AfterViewInit {

  @ViewChild('nameRef') nameInputRef: ElementRef;
  @ViewChild('amountRef') nameAmountRef: ElementRef;

  @Output() ingredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.nameInputRef.nativeElement.focus()
  }

  AddIngredient(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.nameAmountRef.nativeElement.value;
    const  newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredient.emit(newIngredient);
  }

}
