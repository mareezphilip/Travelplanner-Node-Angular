import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './adminpages/dashboard/dashboard.component';

const routes: Routes = [


  {path: "home" ,component:HomeComponent},
  {path:"auth",component:AuthComponent},
  {path:"dashboard",component:DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
