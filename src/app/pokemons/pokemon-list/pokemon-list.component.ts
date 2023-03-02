import { Component, OnInit } from '@angular/core';

import { PagedData, Pokemon } from '../../pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit{
  pokemons!: PagedData<Pokemon>;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemonParamsPages(20).subscribe(
      pokemons => this.pokemons = pokemons
    );
  }

  onScroll(): void{
    this.pokemonService.getPokemonParamsPages(20, this.pokemons?.data.length).subscribe({
      next: (pokemons) => {
        if(this.pokemons){
          this.pokemons.data = this.pokemons.data.concat(pokemons.data);
        }
      }
    }

    );


  }

}
