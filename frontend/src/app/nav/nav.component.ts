import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() navSelected = new EventEmitter
  private navSelectedValue: string
  private isMouseOnHomeValue: boolean

  constructor() {
    this.navSelectedValue = 'home'
    this.isMouseOnHomeValue = false
  }

  ngOnInit() {
  }

  selectedHome(): void {
    this.navSelectedValue = 'home'
    this.navSelected.emit(this.navSelectedValue)
  }

  selectedAbout(): void {
    this.navSelectedValue = 'about'
    this.navSelected.emit(this.navSelectedValue)
  }

  setStyles(): Object {
    const styles = {
      'fill': this.isMouseOnHomeValue ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 1)',
    };
    return styles;
  }

  isMouseOnHome() {
    this.isMouseOnHomeValue = !this.isMouseOnHomeValue
  }

}
