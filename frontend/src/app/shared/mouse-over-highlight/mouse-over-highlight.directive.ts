import { Directive, Input, OnInit, HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[appMouseOverHighlight]'
})
export class MouseOverHighlightDirective implements OnInit {

  @Input() appMouseOverHighlight: string
  @HostBinding('class') hostClass: string;
  @HostBinding('style.color') hostStyleColor: string;

  ngOnInit() {}

  @HostListener('mouseenter') changeBackgroundToHightlightColor(): void {
    this.hostClass = 'background-' + this.appMouseOverHighlight
    this.hostStyleColor = 'white'
  }

  @HostListener('mouseleave') changeBackgroundToDefaultColor(): void {
    this.hostStyleColor = ''
    this.hostClass = ''
  }

}
