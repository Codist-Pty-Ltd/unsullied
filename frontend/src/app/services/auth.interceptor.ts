import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { readAdminToken } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = readAdminToken();
    const authed = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authed).pipe(
      catchError((error: HttpErrorResponse) => {
        const adminCall = req.url.includes('/api/quotes') && !req.url.endsWith('/api/quotes');
        const listCall = req.method === 'GET' && /\/api\/quotes$/.test(req.url.split('?')[0]);
        if (error.status === 401 && (adminCall || listCall)) {
          localStorage.removeItem('unsullied_admin_token');
          localStorage.removeItem('unsullied_admin_expiry');
          this.router.navigate(['/admin/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
