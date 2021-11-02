import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private http: HttpClient, private envservice: EnvService, private router: Router) { }

  register(username, email, password, business_id): Observable<any>{
    return this.http.post(this.envservice.API_URL+'/auth/register', {username, email, password, business_id}, this.httpOptions);
  }

  login(email, password): Observable<any>{
    return this.http.post(this.envservice.API_URL+'/auth/login', {email, password}, this.httpOptions);
  }
}
