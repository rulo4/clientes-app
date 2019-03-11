import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private serverUrl:string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {

  }

  getClientes(): Observable<Cliente[]> {
    // return this.http.get<Cliente[]>(this.serverUrl);
    return this.http.get(this.serverUrl).pipe(
      map(response => response as Cliente[])
    );
  }
}
