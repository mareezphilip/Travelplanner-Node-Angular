import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {
  private geocodingBaseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  private apiKey = 'AIzaSyDMDjP7enJ3nYu1ITkoyluPiEzcFRSRk_A';

  constructor(private http: HttpClient) {}

  getLocation(address: string): Observable<any> {
    const url = `${this.geocodingBaseUrl}?address=${encodeURIComponent(
      address
    )}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
