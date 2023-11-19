import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token');
      if(!token){
        this.router.navigate(['/main']);
        return false;
      }

      return this.authService.validateToken(token).pipe(
        map(valid => {
          if(!valid) {
            this.router.navigate(['/main']);
          }

          return valid;
        })
      );

  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/main']);
      return false;
    }

    return this.authService.validateToken(token).pipe(
      map(valid => {
        if (!valid) {
          this.router.navigate(['/main']);
          return false;
        }
        return true;
      })
    );

  }
}
