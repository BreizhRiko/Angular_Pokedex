import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Pokemon } from '../model/pokemon';
import { PagedData } from "../model/PagedData";
import { MessageService } from './message.service'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  private pokemonUrl = 'http://pokedex-api.cleverapps.io/pokemons';


  /**
   * @returns pokemon list
   */
  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.pokemonUrl);
  }

  /**
   * get the information of a pokemon for a given id
   * @param id pokemon id
   * @returns pokemon list
   */
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;
    return this.http.get<Pokemon>(url);
  }

  /**
   * request a list of pokemon to display to the postman API according to our parameters
   * @param limit number of pokemon to display
   * @param offset offset
   * @param search query
   * @returns pokemon list
   */
  public getPokemonParams(limit?: number, offset?: number, search?: string): Observable<PagedData<Pokemon>> {
    let params = new HttpParams();
    if(offset) params = params.append('offset', offset);
    if(limit) params = params.append('limit', limit);
    if(search) params = params.append('search', search);
    return this.http.get<PagedData<Pokemon>>(this.pokemonUrl , { params: params });
  }

}
