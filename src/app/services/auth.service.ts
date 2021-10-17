import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpParamEncoder } from '../helpers/CustomHttpParamEncoder';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(username, password: string, type: string) {
      const data = {
        email: username,
        password: password,
        type: type
      };
    return this._http.post<any>(`${environment.apiUrlOAuth}`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      }
    })
        .pipe(map(user => {
          console.log(user);
            var userde = user.access_token;
            var decoded = jwt_decode(userde);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(user));
            localStorage.setItem('currentUser', JSON.stringify(decoded));
            console.log(decoded);
            this.currentUserSubject.next(decoded);
           
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
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');

    this.currentUserSubject.next(null);
}
hasRole(role: any) {
  console.log(role);
  return this.currentUserValue.type_user === role;
}
}
