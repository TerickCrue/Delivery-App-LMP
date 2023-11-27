import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../../../dtos/gestion-producto/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = `${environment.baseUrl}/producto`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/getall`);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getProductosByNegocioId(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/negocio/${id}`);
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, producto);
  }

  updateProducto(id: number, producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
