import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropDownDirective {
  @HostBinding('class.open') toggle: boolean = false;

  constructor() {}

  @HostListener('click') clickButton(eventData: Event) {
    this.toggle = !this.toggle;
  }
}
