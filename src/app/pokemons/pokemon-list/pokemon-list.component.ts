import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Pokemon } from '../../model/pokemon';
import { PagedData } from "../../model/PagedData";
import { PokemonService } from '../../services/pokemon.service';

import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})


export class PokemonListComponent implements OnInit{
  @Output() selected = new EventEmitter<number>();

  hide = true;
  pokemons!: PagedData<Pokemon>;
  private searchTerms = new Subject<string>();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {

    this.getPokemons();
  }

  onScroll(): void{
    this.pokemonService.getPokemonParams(10, this.pokemons?.data.length, this.query).subscribe({
    next: (pagedData) => {
      if(this.pokemons) {
        this.pokemons.data = this.pokemons.data.concat(pagedData.data);
      }
    }
  });

  }

  selectPokemon(pokemon : Pokemon ): void {
    this.selected.emit(pokemon.id);
  }

  query: string = '';

  search(q: string): void {
    this.query =q;
    console.log(this.query);

    this.getPokemons();
    //get pokemon // si query qq chose choix avec string sinon comme maintenant
  }

  clearSearch() {
    this.query = '';
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemonParams(20,0,this.query).subscribe({
      next: (pagedData) => {
        this.pokemons = pagedData;
      }
    });
  }
}
