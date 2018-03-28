import { UrlService } from './../../../control/url/url.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SettingsService } from 'app/control/settings/settings.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private slcColorPage: string;
  private isMouseOnHomeValue: boolean;

  private homeUrl: string;
  private aboutUrl: string;

  constructor(private settingService: SettingsService) {
    this.isMouseOnHomeValue = false

    if (localStorage.getItem('theme')) {
      this.slcColorPage = localStorage.getItem('theme')
    } else {
      this.slcColorPage = 'blue'
      localStorage.setItem('theme', this.slcColorPage);
    }

    this.homeUrl = UrlService.WEB_HOME_FULL_URL;
    this.aboutUrl = UrlService.WEB_ABOUT_FULL_URL;
  }

  ngOnInit() {
    this.settingService.setThemeColor(this.slcColorPage);
  }

  themeColorSelected(): void {
    localStorage.setItem('theme', this.slcColorPage);
    this.settingService.setThemeColor(this.slcColorPage);
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

  divClass(): Object {
    return {
      'background-blue': this.slcColorPage === 'blue',
      'background-orange': this.slcColorPage === 'orange',
      'background-red': this.slcColorPage === 'red'
    }
  }

  btnClass(): Object {
    return {
      'btn-primary': this.slcColorPage === 'blue',
      'btn-warning': this.slcColorPage === 'orange',
      'btn-danger': this.slcColorPage === 'red'
    }
  }

}