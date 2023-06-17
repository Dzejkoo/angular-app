import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private _dataStorage: DataStorageService) {}
  onSaveData() {
    this._dataStorage.storeRecipe();
  }

  getData() {
    this._dataStorage.getRecipeData().subscribe();
  }
}
