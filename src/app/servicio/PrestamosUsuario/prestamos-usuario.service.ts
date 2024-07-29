/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrestamosUsuarioService {

  constructor() { }
}*/


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from 'src/app/clase/Prestamo/prestamo';
import { Libro } from 'src/app/clase/Libro/libro';

@Injectable({
  providedIn: 'root'
})
export class ListaPrestamoService {

  constructor(private http: HttpClient) { }

  getPrestamosByUsuario(usuarioId: string, link: string): Observable<Prestamo[]> {
    const url = `${link}prestamos/usuario/${usuarioId}`;
    return this.http.get<Prestamo[]>(url);
  }

  getLibroById(id: number, link: string): Observable<Libro> {
    const url = `${link}libros/${id}`;
    return this.http.get<Libro>(url);
  }

  updatePrestamo(prestamoId: number, prestamoUpdate: Partial<Prestamo>, link: string): Observable<Prestamo> {
    const url = `${link}prestamos/${prestamoId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Prestamo>(url, prestamoUpdate, { headers });
  }

  getPrestamosByUsuarioCaducados(usuarioId: string, link: string): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${link}prestamos/caducado/${usuarioId}`, {
      headers: {
        'Authorization': `Bearer ${link}`
      }
    });
  }

  getAllPrestamos(link: string): Observable<Prestamo[]> {
    const url = `${link}prestamos`;
    return this.http.get<Prestamo[]>(url);
  }
}

