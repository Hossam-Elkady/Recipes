import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  signUp(registerData: any): Observable<any> {
    return this.http.post("https://routeegypt.herokuapp.com/signup", registerData)
  }
  signIn(loginData: any): Observable<any> {
    return this.http.post("https://routeegypt.herokuapp.com/signin", loginData)
  }
}
