import { Injectable} from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { empty, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://pokedex-api.cleverapps.io';

  constructor(private http: HttpClient) {

   }

   login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body)
      .pipe(map((response: { access_token: any; refresh_token: any; expires_in: any; }) => {
        const { access_token, refresh_token, expires_in } = response;
        return { access_token, refresh_token, expires_in };
      }));
  }
}
