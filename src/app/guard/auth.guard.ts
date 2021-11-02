import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/tokenstorage.service';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const expectedRole = route.data?.role;  
    const user = await this.tokenStorage.DecodeToken();
    if(!user) {
      return this.router.parseUrl('/login');
    } else {
      const role = user['role'];
      if(!expectedRole || expectedRole === role) {
        return true;
      } else {
        if(role === 'user') {
          return this.router.navigate(['/home']);
        } else {
          return false;
        }
      }
    }
  }
}
