import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservationPerUser } from '../layouts/client-layout/components/reservation-per-user/reservation-per-user.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private headers = new HttpHeaders()
  .set("Content-Type", "application/json")

  constructor(private _httpClient: HttpClient) { }

  create(data): Observable<any> {

    return this._httpClient.post<any>(`${environment.apiUrlReservation}`, JSON.stringify(data), {
      headers: this.headers
    });
  }

  findByUserId(id): Observable<ReservationPerUser[]> {
    return this._httpClient.get<ReservationPerUser[]>(`${environment.apiUrlReservation}/user/${id}`);
  }
  
}
