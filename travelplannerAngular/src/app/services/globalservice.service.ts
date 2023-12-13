import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalserviceService {
  isLogin = false
  userType :any
  constructor(private http:HttpClient) { }

  Register(obj:any):Observable<any>{

    return this.http.post("http://localhost:4000/users/add",obj)
}
Login(obj:any):Observable<any>{

  return this.http.post("http://localhost:4000/users/login",obj)
}
getallemails():Observable<any>{

  return this.http.get("http://localhost:4000/users/getallemails")
}
logoutuser():Observable<any>{
  return this.http.get("http://localhost:4000/users/logout")
  }
  getallcities():Observable<any>{

    return this.http.get("http://localhost:4000/city/allcitesdata")
  }
  getallhotels():Observable<any>{

    return this.http.get("http://localhost:4000/hotel/allhotels")
  }
  deleteCity(id:any):Observable<any>{
    return this.http.delete(`http://localhost:4000/city/deletecity/${id}`)
  }
  deletehotel(id:any):Observable<any>{
    return this.http.delete(`http://localhost:4000/hotel/deletehotel/${id}`)
  }
  Addnewcity(obj:any):Observable<any>{

    return this.http.post("http://localhost:4000/city/addcity",obj)
  }
  Addnewhotel(obj:any):Observable<any>{

    return this.http.post("http://localhost:4000/hotel/addhotel",obj)
  }
  getallcitiesName():Observable<any>{

    return this.http.get("http://localhost:4000/city/citiesName")
  }
  getallhotelsName():Observable<any>{

    return this.http.get("http://localhost:4000/hotel/hotelsName")
  }

}
