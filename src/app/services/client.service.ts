import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../layouts/admin-layout/components/client/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private headers = new HttpHeaders()
    .set("Content-Type","application/json")


  constructor(private _httpClient: HttpClient) {}
  getClients(): Observable<Client[]> {
    return this._httpClient.get<Client[]>(`${environment.apiUrlClient}`);
  }

  delete(id: string): Observable<any> {
   return this._httpClient.delete<any>(`${environment.apiUrlClient}/${id}`); 
  }

  create(data: string): Observable<Client> {
    
    return this._httpClient.post<Client>(`${environment.apiUrlClient}`, data, {
      headers: this.headers
    });
  }

  update(data: string, id: string): Observable<Client> {
    return this._httpClient.put<Client>(`${environment.apiUrlClient}/${id}`, data, {
      headers: this.headers
    });
  }

}
