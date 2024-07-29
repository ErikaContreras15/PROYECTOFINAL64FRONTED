/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualizarClienteService {

  constructor() { }
}*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
//import { Cliente } from 'src/app/clase/Cliente/cliente';
import { Cliente } from '../../clase/Cliente/cliente';


@Injectable({
  providedIn: 'root'
})
export class ActualizarClienteService {

  constructor(private http: HttpClient) { }

  getClienteByUserId(userId: number, link: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${link}cliente/usuario/${userId}`);
  }

  // Actualizar cliente
  updateCliente(cliente: Cliente, link: string): Observable<Cliente> {
    return this.http.put<Cliente>(`${link}cliente`, cliente);
  }
}
