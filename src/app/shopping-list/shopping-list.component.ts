import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsList: Ingredient[];
  private subscription$: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientsList = this.shoppingListService.getIngredients();
    this.subscription$ = this.shoppingListService.onAddIngredient.subscribe(
      (ingredient: Ingredient) => {
        this.ingredientsList.push(ingredient);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
