import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Usuario } from 'src/app/clase/Usuarios/usuario';
import { Usuario } from '../../clase/Usuarios/usuario';
import { Observable } from 'rxjs';

export interface CreateUsuarioResponse {
  id: string; // o 'number' si el ID es numérico
  // otras propiedades si las hay
}

@Injectable({
  providedIn: 'root'
})
export class RegistrarseService {
  constructor(private httpClient: HttpClient) {}

  crearUsu(registro: Usuario, link: string): Observable<CreateUsuarioResponse> {
    return this.httpClient.post<CreateUsuarioResponse>(link + "usuarios", registro);
  }
}