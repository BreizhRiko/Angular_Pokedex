import { Injectable} from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private email!: string;
  private password!: string;

  apiUrl = 'http://pokedex-api.cleverapps.io/pokemons';

  constructor(private http: HttpClient) {
    this.email = "francois.poire@ig2i.centralelille.fr";
    this.password = "toto12345";

   }

   login(email: string, password: string) {

    if (email === email && password === password) {
      const body = { email, password };
      return this.http.post<any>(`${this.apiUrl}/auth/login`, body)
        .pipe(map((response: { access_token: any; refresh_token: any; expires_in: any; }) => {
          const { access_token, refresh_token, expires_in } = response;
          return { access_token, refresh_token, expires_in };
        }));
    } else {
      return null;
    }
  }

}
