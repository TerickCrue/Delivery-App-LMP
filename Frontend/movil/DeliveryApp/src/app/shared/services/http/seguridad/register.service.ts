import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegister } from 'src/app/shared/dtos/seguridad/user-register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private dataUrl = `${environment.baseUrl}/usuario`;

  constructor(public http: HttpClient) { }

  register(usuario: UserRegister): Observable<any> {
    return this.http.post<any>(`${this.dataUrl}/create`, usuario);
  }

}
