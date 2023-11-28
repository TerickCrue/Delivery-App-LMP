import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCreds } from 'src/app/shared/dtos/seguridad/user-creds';
import { UserLogin } from 'src/app/shared/dtos/seguridad/user-login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private dataUrl = `${environment.baseUrl}/login`;
  
  constructor(public http: HttpClient) { }

  public login(usuario: UserLogin): Observable<UserCreds> {
    return this.http.post<any>(`${this.dataUrl}/autenticar/usuario`, usuario);
  }
  
}
