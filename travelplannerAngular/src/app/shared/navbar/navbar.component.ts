import { Component,HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalserviceService } from 'src/app/services/globalservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
// @HostBinding('class.navbar-background') isNavbarBackground = false;

  constructor( public service:GlobalserviceService ,private router: Router){}
  @HostBinding('class')
  get navbarClass() {
    // Get the current route URL
    const currentRoute = this.router.url;

    if (currentRoute === '/home') {
      return 'navbar-home';
    } else {
      // Return a default class if not on the home or auth page
      return 'navbar-auth';
    }
  }

//   ngOnInit() {


//     if(this.router.url==="/home"){
//       this.isNavbarBackground=true
//       console.log("ana fe home");
//       console.log(this.router.url)
//     }
//     // this.isNavbarBackground = this.router.url === '/';
//   else {

// this.isNavbarBackground=false
// console.log(this.router.url)

// console.log("ana ay page");

//   }

//   }
  handlelogout(){
    this.service.isLogin = false
    
    this.service.logoutuser().subscribe(res=>{
      console.log(res)
     
    })
    localStorage.removeItem('token')
  }
}
