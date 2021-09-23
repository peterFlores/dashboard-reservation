import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../layouts/admin-layout/components/menu/menu.model';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
 
  private headers = new HttpHeaders()
  .set("Content-Type","application/json")

  constructor(private _httpClient: HttpClient) {}

  getMenus(): Observable<Menu[]>{
    return this._httpClient.get<Menu[]>(`${environment.apiUrlMenu}`);
  }

  delete(id: string): Observable<any> {
    return this._httpClient.delete<any>(`${environment.apiUrlMenu}/${id}`); 
   }
 
   create(data: string): Observable<Menu> {
     console.log(data);
     return this._httpClient.post<Menu>(`${environment.apiUrlMenu}`, data, {
       headers: this.headers
     });
   }
 
   update(data: string, id: string): Observable<Menu> {
     return this._httpClient.put<Menu>(`${environment.apiUrlMenu}/${id}`, data, {
       headers: this.headers
     });
   }

}