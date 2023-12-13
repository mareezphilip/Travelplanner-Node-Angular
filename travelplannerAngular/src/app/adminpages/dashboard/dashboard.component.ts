import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  city: boolean = false
  travel: boolean = false
  hotel: boolean = false
  addadmin: boolean = false
  dash: boolean = true

  cites() {
    this.city = true
    this.hotel = false
    this.travel = false
    this.addadmin = false
    this.dash = false
  }
  hotels() {
    this.city = false
    this.hotel = true
    this.travel = false
    this.addadmin = false
    this.dash = false

  }
  travels() {
    this.city = false
    this.hotel = false
    this.travel = true
    this.addadmin = false
    this.dash = false

  }
  addadminfun() {
    this.city = false
    this.hotel = false
    this.travel = false
    this.addadmin = true
    this.dash = false

  }
  dashfun() {
    this.city = false
    this.hotel = false
    this.travel = false
    this.dash = true
    this.addadmin = false
  }
}
