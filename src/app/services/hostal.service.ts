import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hostal } from '../layouts/admin-layout/components/hostal/hostal.model';
import { Reservation } from '../layouts/client-layout/components/reservation/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class HostalService {

  private headers = new HttpHeaders()
    .set("Content-Type", "application/json")

  constructor(private _httpClient: HttpClient) { }

  getHostal(): Observable<Hostal[]> {
    return this._httpClient.get<Hostal[]>(`${environment.apiUrlHostal}`);
  }

  getHostalById(id: string): Observable<Hostal> {
    return this._httpClient.get<Hostal>(`${environment.apiUrlHostal}/${id}`);
  }


  delete(id: string): Observable<any> {
    return this._httpClient.delete<any>(`${environment.apiUrlHostal}/${id}`);
  }

  create(data: string): Observable<Hostal> {

    return this._httpClient.post<Hostal>(`${environment.apiUrlHostal}`, data, {
      headers: this.headers
    });
  }

  update(data: string, id: string): Observable<Hostal> {
    return this._httpClient.put<Hostal>(`${environment.apiUrlHostal}/${id}`, data, {
      headers: this.headers
    });
  }

  findReservation(data): Observable<Reservation> {
    return this._httpClient.post<Reservation>(`${environment.apiUrlHostal}/reservation`, data, {
      headers: this.headers
    })
  }
}
