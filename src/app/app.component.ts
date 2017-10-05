import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import { User } from './shared/models/user';
import { Observable } from 'rxjs/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'AngularJsonApp'
  users: User[]
  page: number
  currentDate: Date
  currentDatePretty: string

  constructor(private http: Http) {
    this.page = 1
    this.updateEverySecond()
  }

  ngOnInit() {
    // GET Users
    this.updateEverySecond().subscribe(
      data => this.getDate()
    )
    this.getUsers()
  }

  getUsers() {
    this.http.get('https://reqres.in/api/users?page=' + this.page)
      .subscribe(data => {
        this.updateUsers(data)
      });
  }

  getDate() {
    this.currentDate = new Date()
    this.currentDatePretty = this.forceTwoDigits(this.currentDate.getHours()) + ':' 
    + this.forceTwoDigits(this.currentDate.getMinutes()) + ':' 
    + this.forceTwoDigits(this.currentDate.getSeconds())
  }

  updateEverySecond() {
    return Observable.interval(1000)
  }

  updateUsers(data) {
    console.log(data.json())
    this.users = data.json().data
    this.page++
    if (this.page > data.json().total_pages) {
      this.page = 1
    }
  }

  forceTwoDigits(value: number): string {
    return ('0' + value).slice(-2)
  }

}
