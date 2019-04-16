import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Cliente } from './cliente';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private serverUrl = 'http://localhost:8080/api/clientes';
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {

  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.serverUrl).pipe(
      map((response: any) => {
        const clientes = response as Cliente[];

        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.apellido = cliente.apellido.toUpperCase();
          cliente.creacion = formatDate(cliente.creacion, 'fullDate', 'es-MX');
          return cliente;
        });
      }),
      catchError(e => {
        this.toastr.error(e.error.msj);
        return throwError(e);
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.serverUrl, cliente, {headers: this.httpHeaders}).pipe(
      map((respose: any) => respose.cliente as Cliente),
      catchError(e => {
        this.toastr.error(e.error.msj);
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get(`${this.serverUrl}/${id}`).pipe(
      map((respose: any) => respose.cliente as Cliente),
      catchError(e => {
        this.router.navigate(['/clientes']);
        this.toastr.error(e.error.msj);
        return throwError(e);
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put(`${this.serverUrl}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map((respose: any) => respose.cliente as Cliente),
      catchError(e => {
        this.toastr.error(e.error.msj);
        return throwError(e);
      })
    );
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.serverUrl}/${id}`, {headers: this.httpHeaders}).pipe(
      map((respose: any) => respose.cliente as Cliente),
      catchError(e => {
        this.toastr.error(e.error.msj);
        return throwError(e);
      })
    );
  }
}
