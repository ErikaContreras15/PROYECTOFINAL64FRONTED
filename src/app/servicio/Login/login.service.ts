/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
}
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private httpClient: HttpClient) {}

  authenticate(username: string, password: string, link: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
  
    return this.httpClient.get<any>(`${link}usuarios/autenticacion`, { params });
  }
  
}

