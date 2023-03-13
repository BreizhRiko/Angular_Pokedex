import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { AuthComponent } from '../auth/auth.component';

@Injectable({
  providedIn: 'root'
})
export class TeamPokemonService {
  private team: number[]=[];

  apiUrl = "http://pokedex-api.cleverapps.io";
  constructor(private http: HttpClient,private auth: AuthComponent) {
    this.getData().subscribe({
      next: (team) => {
        this.team = team;
      }
    })

   }

  getData(): Observable<number[]>{
    if(this.auth.authOk == false){
      return of(new Array<number>);
    }
    let access_token = localStorage.getItem('acces_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    return this.http.get<number[]>(`${this.apiUrl}/trainers/me/team`, { headers });
  }

  sendData(data: number[]) {
    let access_token = localStorage.getItem('acces_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    return this.http.post<any>(`${this.apiUrl}/trainers/me/team`, data, { headers })
      .pipe(map(response => {
        console.log(response);
        return response;
      }));
  }

}
