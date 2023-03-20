import { Subscription } from 'rxjs';
import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';

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
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredientsList = this.shoppingListService.getIngredients();

    this.subscription = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredientsList = ingredients;
        console.log(this.ingredientsList);
      }
    );
  }

  onEditItem(index: number) {
    console.log(this.ingredientsList);
    this.shoppingListService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
