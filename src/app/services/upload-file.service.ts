import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}

  sendFile(payload: FormData, idBooking: number) {
    return this.http.post<{ success: boolean }>(
      `${environment.API}/pqrs/${idBooking}`,
      payload
    );
  }
}
