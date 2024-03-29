import { Pokemon } from '../../model/pokemon';
import { Component, OnInit } from '@angular/core';

import { PokemonService } from 'src/app/services/pokemon.service';

import { TeamsComponent } from '../teams/teams.component';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})

export class PokedexComponent{

  selectedPokemonId: number | null = null;

  constructor(private pokemonService: PokemonService) { }

  /**
   * retrieves the ID of the selected pokémon
   * to display its details
   * @param id id of selected pokemon
   */
  selectItem(id: number) {
    this.selectedPokemonId = id;
  }
}
