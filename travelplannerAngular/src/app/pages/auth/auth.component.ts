import { Component,HostBinding  } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
@HostBinding('class.navbar-background') isNavbarBackground = false;

  islogin: boolean = false
  isregister: boolean = true

  
  constructor(private router: Router) {}

  ngOnInit() {
    this.isNavbarBackground = this.router.url === '/auth';
  }
  loginfun() {
    this.islogin = true
    this.isregister = false
  }
  registerfun() {
    this.islogin = false
    this.isregister = true
  }

}
