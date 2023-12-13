import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BackgroundComponent } from './components/background/background.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { LoginComponent } from './pages/login/login.component';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { RegisterComponent } from './pages/register/register.component';
import { AuthComponent } from './pages/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './adminpages/dashboard/dashboard.component';
import { CitiesComponent } from './adminpages/cities/cities.component';
import { HotelsComponent } from './adminpages/hotels/hotels.component';
import { TravelsComponent } from './adminpages/travels/travels.component';
import { AddadminComponent } from './adminpages/addadmin/addadmin.component';
import { InterceptorInterceptor } from './interceptor/interceptor.interceptor';
import { GoogleMapsModule } from '@angular/google-maps';
import { DashComponent } from './adminpages/dash/dash.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BackgroundComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    DashboardComponent,
    CitiesComponent,
    HotelsComponent,
    TravelsComponent,
    AddadminComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '313882847247-4u27juib0kc1isktkmpiqos2mpr0jlt4.apps.googleusercontent.com'
            )
          },
        
          
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    GoogleSigninButtonDirective,
    {
      provide : HTTP_INTERCEPTORS ,
      useClass : InterceptorInterceptor ,
      multi : true,
     
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
