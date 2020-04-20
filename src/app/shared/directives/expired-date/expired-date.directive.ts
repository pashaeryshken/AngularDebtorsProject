import {Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appExpiredDate]'
})
export class ExpiredDateDirective implements OnInit {

  @Input('appExpiredDate') public date: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  public ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'color', '#7f7f7f');
    if (Date.parse(this.date) < Date.now()) {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#dc3545');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', '600');
    }
  }
}
