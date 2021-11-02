import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Observable, EMPTY , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'
import { TokenStorageService } from './tokenstorage.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {

  token: string;

  constructor(
    public router: Router,
    private alertService: AlertService,
    private tokenStorage: TokenStorageService
  ) { }

  async getToken() {
    this.token = await this.tokenStorage.getToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.getToken();
    req =  req.clone({
      setHeaders: {
        Authorization: `${this.token}`
      }
    });

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (Array.isArray(error.error.errors)) {
            this.alertService.presentToast(error.error.errors[0].msg, 'danger')
          } else {
            switch (error.status) {
              case 401:
                this.router.navigate(['/login']);
                // this.tokenStorage.logout();
                break;
              case 404:
                this.router.navigate(['/pageNotFound']);
                break;
              case 500:
                this.router.navigate(['/serverError']);
                break;
            }
          }
        }
        return EMPTY;
      })
    )
  }
}