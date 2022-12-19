import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() page: EventEmitter<string> =  new EventEmitter()

  currentPage(value: string){
    this.page.emit(value)
  }
}
