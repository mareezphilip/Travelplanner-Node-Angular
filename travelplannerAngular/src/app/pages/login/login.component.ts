import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalserviceService } from 'src/app/services/globalservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: SocialAuthService,private router : Router,private formBuilder: FormBuilder,private service:GlobalserviceService) { }
  user:any
  loggedIn:any
  myForm: FormGroup = this.formBuilder.group({
    // Define form controls and their initial values
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],


  });
  userdata:any=""
  userlogin:any=""
emails:any=[]
  tokens:any=[{}]
result:any
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    this.tokens=[{
      token:this.user.idToken
    }]
     this.userdata={
        Name:this.user.name,
        email:this.user.email,
        password:this.user.id,
        tokens:this.tokens
        
      }
      this.userlogin={
      
        email:this.user.email,
        password:this.user.id,
     
        
      }
      this.service.getallemails().subscribe(res=>{
        console.log("all emails",res.data)
        this.emails=res.data
    
        if(!this.emails.includes(this.user.email)){
          this.service.Register(this.userdata).subscribe(res => {
            console.log("ana fe service google")
            console.log(res)
            this.service.Login(this.userlogin).subscribe(res=>{
              console.log("ana fe service login google")
              console.log(res)
            })
          })
        }
        else{
          this.service.Login(this.userlogin).subscribe(res=>{
            console.log("ana fe service login google")
            console.log(res)
          })
        }
      })

   
    

      console.log("register data google",this.userdata)
    });

  }
  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, perform desired actions
      console.log("ana fe if")

      console.log(this.myForm.value);
      console.log(this.myForm);

      this.service.Login(this.myForm.value).subscribe(res => {
        console.log("ana fe service")
        this.result=res
        if(this.result.apiStatus) {
          localStorage.setItem('token' , this.result.data.token)
          localStorage.setItem('type' , this.result.data.userData.userType)
          this.service.userType = this.result.data.userData.userType
          console.log(this.service.userType)
          if(this.service.userType=="user"){
            this.router.navigateByUrl('/home')
           }
           else if(this.service.userType=="admin"){
             console.log(this.service.userType)
            
             this.router.navigateByUrl('/dashboard')
         
             
           }
           this.service.isLogin = true
        }
        console.log(res)
      })
      // ... do something with the form data
    } else {
      // Form is invalid, show error messages or perform error handling
      Object.values(this.myForm.controls).forEach(control => control.markAsTouched());
      console.log("ana fe else")
    }
  }
 
}
