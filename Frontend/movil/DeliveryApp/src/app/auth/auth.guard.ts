import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AuthGuard#canActivate called');

    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/acceso']);
      return false
    }

    return this.authService.isAuthenticated();
    
      const token = localStorage.getItem('token');
      if(!token){
        this.router.navigate(['/acceso']);
        return false;
      }

      return this.authService.validateToken(token).pipe(
        map(valid => {
          if(!valid) {
            this.router.navigate(['/acceso']);
          }

          return valid;
        })
      );

  }
}
