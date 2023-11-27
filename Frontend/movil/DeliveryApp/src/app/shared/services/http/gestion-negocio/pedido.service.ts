import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidoResponse } from '../../../dtos/gestion-pedido/pedido-response';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = `${environment.baseUrl}/pedido`;

  constructor(private http: HttpClient) {}

 
  getPedidoById(pedidoId: number): Observable<PedidoResponse> {
    return this.http.get<any>(`${this.apiUrl}/${pedidoId}`);
  }

  getPedidosByUsuarioId(usuarioId: number): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  getPedidosByNegocioId(negocioId: number): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(`${this.apiUrl}/negocio/${negocioId}`);
  }

  crearPedido(pedido: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, pedido);
  }

  actualizarPedido(pedidoId: number, pedido: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${pedidoId}`, pedido);
  }

  eliminarPedido(pedidoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${pedidoId}`);
  }
}
