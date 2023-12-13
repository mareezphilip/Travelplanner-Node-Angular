import { Component } from '@angular/core';
import { GlobalserviceService } from 'src/app/services/globalservice.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  userlength:any
  constructor(private service :GlobalserviceService){}
  ngOnInit(){
    this.service.getallemails().subscribe(res=>{
      console.log(res.data.length)
      this.userlength=res.data.length
    })
  }

}
