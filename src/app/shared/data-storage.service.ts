import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, take, tap, exhaustMap } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private _http: HttpClient,
    private _recipeService: RecipeService,
    private _authService: AuthService
  ) {}

  getRecipeData() {
    return this._http
      .get<Recipe[]>(
        'https://recipe-app-59839-default-rtdb.europe-west1.firebasedatabase.app/recipe.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => this._recipeService.setRecipes(recipes))
      );
  }

  storeRecipe() {
    const recipes = this._recipeService.getRecipes();
    this._http
      .put(
        'https://recipe-app-59839-default-rtdb.europe-west1.firebasedatabase.app/recipe.json',
        recipes
      )
      .subscribe((resposne) => console.log(resposne));
  }
}
