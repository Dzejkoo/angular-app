import { Component, Injectable, OnInit } from '@angular/core';

import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredientsList: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientsList = this.shoppingListService.getIngredients();
    this.shoppingListService.onAddIngredient.subscribe(
      (ingredient: Ingredient) => {
        this.ingredientsList.push(ingredient);
      }
    );
  }
}
