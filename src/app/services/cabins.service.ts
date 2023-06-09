import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Booking } from '../interface/ibooking';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CabinsService {

  constructor(private httpClient: HttpClient) {

  }

  getBookingByCode(bookingCode: string) {
    return this.httpClient.get<Booking>(`${environment.API}/bookings/${bookingCode}`);
  }
}
