import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../layouts/admin-layout/components/user/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  private headers = new HttpHeaders()
  .set("Content-Type","application/json")

  constructor(private _httpClient: HttpClient) {}

  getUsers(): Observable<User[]>{
    return this._httpClient.get<User[]>(`${environment.apiUrlUser}`);
  }

  delete(id: string): Observable<any> {
    return this._httpClient.delete<any>(`${environment.apiUrlUser}/${id}`); 
   }
 
   create(data: string): Observable<User> {
     
     return this._httpClient.post<User>(`${environment.apiUrlUser}`, data, {
       headers: this.headers
     });
   }
 
   update(data: string, id: string): Observable<User> {
     return this._httpClient.put<User>(`${environment.apiUrlUser}/${id}`, data, {
       headers: this.headers
     });
   }

}
