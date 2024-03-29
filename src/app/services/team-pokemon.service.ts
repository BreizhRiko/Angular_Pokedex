import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { AuthComponent } from '../auth/auth.component';

@Injectable({
  providedIn: 'root'
})
export class TeamPokemonService {
  getTeamPokemon() {
    throw new Error('Method not implemented.');
  }
  public teamId: number[]=[];

  apiUrl = "http://pokedex-api.cleverapps.io";
  constructor(private http: HttpClient,private auth: AuthComponent) {
    this.getData().subscribe({
      next: (team) => {
        this.teamId = team;
      }})
   }

  /**
   * get the new team from the API
   * @returns
   */
  getData(): Observable<number[]>{
    if(localStorage.getItem('acces') == "false"){
      return of(new Array<number>);
    }
    let access_token = localStorage.getItem('acces_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${access_token}`);
    return this.http.get<number[]>(`${this.apiUrl}/trainers/me/team`, { headers });
  }

  /**
   * send the new team to the API
   * from the teamID list
   * @returns put validation
   */
  sentDataPut(){
    let access_token = localStorage.getItem('acces_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + access_token
      })
    };

    return this.http.put(`${this.apiUrl}/trainers/me/team`, this.teamId, httpOptions);
  }
}
