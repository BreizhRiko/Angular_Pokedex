import { Pokemon } from './../../pokemon';
import { Component, OnInit } from '@angular/core';

import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})

export class PokedexComponent{

  selectedPokemonId: number | null = null;

  constructor(private pokemonService: PokemonService) { }

  selectItem(id: number) {
    this.selectedPokemonId = id;
  }
}
