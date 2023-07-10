import {
  Directive,
  OnDestroy,
  Input,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() appTooltip = '';
  @Input() delay? = 190;

  private myPopup: any;
  private timer: any;

  constructor(private el: ElementRef) {}

  ngOnDestroy(): void {
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      const x =
        this.el.nativeElement.getBoundingClientRect().left +
        this.el.nativeElement.offsetWidth / 2;
      const y =
        this.el.nativeElement.getBoundingClientRect().top +
        this.el.nativeElement.offsetHeight +
        6;
      this.createappTooltipPopup(x, y);
    }, this.delay);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.myPopup) {
      this.myPopup.remove();
    }
  }

  private createappTooltipPopup(x: number, y: number) {
    const popup = document.createElement('div');
    popup.innerHTML = this.appTooltip;
    popup.setAttribute('class', 'appTooltip-container');
    popup.style.top = y.toString() + 'px';
    popup.style.left = x.toString() + 'px';
    document.body.appendChild(popup);
    this.myPopup = popup;
    setTimeout(() => {
      if (this.myPopup) this.myPopup.remove();
    }, 5000);
  }
}
