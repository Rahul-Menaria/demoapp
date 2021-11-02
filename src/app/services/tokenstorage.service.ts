import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'

const TOKEN_KEY = 'x-auth-token'
const ROLE_KEY = 'role'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  DecodeToken() {
    let decodedToken = jwt_decode(localStorage.getItem(TOKEN_KEY));
    return decodedToken;
  }

  public setToken(token: string):void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public logout() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
