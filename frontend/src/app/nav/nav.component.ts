import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() navSelected = new EventEmitter
  private navSelectedValue: string

  constructor() {
    this.navSelectedValue = 'home'
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

}
