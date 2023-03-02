import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { PagedData, Pokemon } from '../pokemon';
import { MessageService } from './message.service'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient,private messageService: MessageService) { }

  private pokemonUrl = 'http://pokedex-api.cleverapps.io/pokemons';


  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.pokemonUrl);
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;
    return this.http.get<Pokemon>(url);
  }

  public getPokemonParamsPages(limit: number, offset?: number): Observable<PagedData<Pokemon>> {
    const url = 'http://pokedex-api.cleverapps.io/pokemons';
    let queryParams = new HttpParams();
    if(offset) {queryParams = queryParams.append("offset",offset);}
    queryParams = queryParams.append("limit",limit);
    return this.http.get<PagedData<Pokemon>>(url,{params:queryParams});
  }

  public getPokemonParamsName(search: string): Observable<PagedData<Pokemon>> {
    const url = 'http://pokedex-api.cleverapps.io/pokemons';
    let queryParams = new HttpParams();
    queryParams = queryParams.append("search",search);
    return this.http.get<PagedData<Pokemon>>(url,{params:queryParams});
  }

}
