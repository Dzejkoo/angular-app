import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isAuth = false;
  private userSub: Subscription;
  constructor(
    private _dataStorage: DataStorageService,
    private _authService: AuthService
  ) {}
  ngOnInit() {
    this.userSub = this._authService.user.subscribe((user) => {
      this.isAuth = !!user;
    });
  }
  onSaveData() {
    this._dataStorage.storeRecipe();
  }
  onLogout() {
    this._authService.logout();
  }

  getData() {
    this._dataStorage.getRecipeData().subscribe();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
