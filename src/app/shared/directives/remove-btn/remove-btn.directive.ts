import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appRemoveBtn]'
})
export class RemoveBtnDirective {
  constructor() {}

  @HostBinding('style.bottom') private bottom: string = '0';

  @HostListener('click')
  public click(): void {
    this.bottom = '-35px';
  }

  @HostListener('blur')
  public blur(): void {
    this.bottom = '0px';
  }
}
