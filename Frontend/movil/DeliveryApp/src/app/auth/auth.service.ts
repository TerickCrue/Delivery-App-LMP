import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { UserLogin } from '../shared/dtos/seguridad/user-login';
import { UserCreds } from '../shared/dtos/seguridad/user-creds';
import { UserRegister } from '../shared/dtos/seguridad/user-register';
import { StorageService } from '../shared/services/storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private http: HttpClient, 
    private router: Router,
    private storage: StorageService,
  ) { }

  private apiUrlLogin = `${environment.baseUrl}/login`;
  //private apiUrlRegister = `${environment.baseUrl}/usuario`;

  // login(usuario: UserLogin): Observable<UserCreds> {
  //   return this.http.post<any>(`${this.apiUrlLogin}/autenticar/usuario`, usuario);
  // }
  
  // register(usuario: UserRegister): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrlRegister}/create`, usuario);
  // }

  validateToken(token: string): any {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrlLogin}/validate-token`, {headers});
  }

  public async obtenerToken(): Promise<string | null> {
    return await this.storage.read('userToken');
  }

  public async logOut(){
    await this.storage.remove('userToken');
    localStorage.clear();
  }

  public async isAuthenticated(): Promise<boolean>{
    const token = await this.obtenerToken();
    if(token === null || token === undefined){
      return false;
    }
    else{
      return this.validateToken(token).pipe(
        map( valid => {
          if(!valid) {
            return false;
          }
          else{
            return true;
          }
        })
      );
    }
  }


}
