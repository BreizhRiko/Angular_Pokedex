import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { PagedData, Pokemon } from '../../pokemon';
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
    this.pokemonService.getPokemonParamsPages(20, this.pokemons?.data.length).subscribe({
      next: (pokemons) => {
        if(this.pokemons){
          this.pokemons.data = this.pokemons.data.concat(pokemons.data);
        }
      }
    });
  }

  checkQuery(str: string): string {
    if (!str) {
      return 'empty';
    } else if (/^[a-zA-Z]+$/.test(str)) {
      return 'letters';
    } else if (/^\d+$/.test(str)) {
      return 'digits';
    } else {
      return 'default';
    }
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
    switch (this.checkQuery(this.query)) {
      case 'empty':
        this.pokemonService.getPokemonParamsPages(20).subscribe(
          pokemons => this.pokemons = pokemons
        );
        break;
      case 'letters':
        this.pokemonService.getPokemonParamsName(this.query).subscribe({
          next: (pokemons) => {
            this.pokemons = pokemons;
            console.log(pokemons);
          }});
        break;
      case 'digits':
        this.pokemonService.getPokemonParamsPages(1,parseInt(this.query,10)-1).subscribe({
          next: (pokemons) => {
            this.pokemons = pokemons;
            console.log(pokemons);
          }});
        console.log(parseInt(this.query,10));
        break;
      case 'default':
        this.pokemonService.getPokemonParamsPages(20).subscribe(
          pokemons => this.pokemons = pokemons
        );
        break;

      default:
        this.pokemonService.getPokemonParamsPages(20).subscribe(
          pokemons => this.pokemons = pokemons
        );
        break;
    }

  }
}
