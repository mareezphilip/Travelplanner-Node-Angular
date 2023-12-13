import { Component, } from '@angular/core';
import { GlobalserviceService } from 'src/app/services/globalservice.service';
import { LocationServiceService } from 'src/app/services/location-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent {
  citesData:any
  searchArea: any;
  location: any;
  citesnames:any;
  myForm: FormGroup = this.formBuilder.group({
    // Define form controls and their initial values
    Name: ['', Validators.required],
    description:['']
   

    })
constructor(private service:GlobalserviceService,private locationService:LocationServiceService,private formBuilder: FormBuilder,) {
  
}

getAreaLocation(): void {
  console.log("ana hnnna")
  this.locationService.getLocation(this.searchArea).subscribe(
    (response) => {
      if (response.results.length > 0) {
        this.location = response.results[0].geometry.location;
        console.log(this.location)
      }
    },
    (error) => {
      console.error('Error occurred while fetching location:', error);
    }
  );
}
ngOnInit(){
this.service.getallcities().subscribe(res=>{
  this.citesData=res.data
  console.log(this.citesData)

})

}
deletecity(i:any){
  let id =this.citesData[i]._id
  this.citesData.splice(i,1)
  this.service.deleteCity(id).subscribe(res=>{

  })
}
addnewcity(){
  console.log("annnnnnnnna ")
  this.service.getallcitiesName().subscribe(res=>{
this.citesnames=res.data
console.log(this.citesnames)
if (this.citesnames.includes(this.myForm.value.Name)){
console.log("city is allready exits")
}
else
{
  this.service.Addnewcity(this.myForm.value).subscribe(res=>{
    console.log(res)
    window.location.reload()
  })
}



  })


}

}
