/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private httpClient: HttpClient) {}

  crearCliente(cliente: any, link: string): Observable<any> {
    return this.httpClient.post(link + "cliente", cliente);
  }
}


