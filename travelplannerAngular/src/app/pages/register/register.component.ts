import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalserviceService } from 'src/app/services/globalservice.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private authService: SocialAuthService, private formBuilder: FormBuilder, private service: GlobalserviceService) { }
  userdata:any=""
  userlogin:any=""
emails:any=[]
  tokens:any=[{}]
  user: any
  loggedIn: any
  myForm: FormGroup = this.formBuilder.group({
    // Define form controls and their initial values
    Name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    countryCode: ['', Validators.required],
    phone: '',
    password: ['', [Validators.required]],
    gender: ['', Validators.required],
    dOfBirth: new Date(),

    addresses: this.formBuilder.group({
      country: '',
      city: ''

    }),

  });

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

      this.service.Register(this.myForm.value).subscribe(res => {
        console.log("ana fe service")

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
