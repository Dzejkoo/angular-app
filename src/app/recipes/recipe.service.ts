import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://szefsmaku.pl/wp-content/uploads/2021/04/wege-burger-1250x712.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://bi.im-g.pl/im/93/a3/19/z26884499IER,Frytki.jpg',
      [new Ingredient('Buns', 1), new Ingredient('Meat', 5)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }
}
