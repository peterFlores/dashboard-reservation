import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpParamEncoder } from '../helpers/CustomHttpParamEncoder';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) {}

  login(username, password: string) {
      const data = {
        email: username,
        password: password,
        type: 'CLIENT'
      };
    return this._http.post<any>(`${environment.apiUrlOAuth}`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      }
    })
        .pipe(map(user => {
          console.log(user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('currentUser', JSON.stringify(user));
            

            //this.currentUserSubject.next(user);
           
            return user;
        }), catchError(this.handleError));
  }
  handleError(error) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
