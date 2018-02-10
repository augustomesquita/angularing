import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  private navSelectedValue: string
  private slcColorPage;

  constructor() { this.navSelectedValue = 'home' }

}
