import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pqrs } from '../interface/ipqrs';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  sendFile(payload: FormData) {
    return this.http.post<Pqrs>(
      `${environment.API}/pqrs`,
      payload
    );
  }
  
}