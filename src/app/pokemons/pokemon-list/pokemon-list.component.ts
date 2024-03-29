import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

import { Pokemon } from '../../model/pokemon';
import { PagedData } from "../../model/PagedData";
import { PokemonService } from '../../services/pokemon.service';

import { Observable, Subject } from 'rxjs';

import { ViewChild, AfterViewInit } from '@angular/core';
import { MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit{
  @Output() selected = new EventEmitter<number>();
  @ViewChild('liste', {read: ElementRef}) liste?: ElementRef<HTMLElement>;

  pokemons!: PagedData<Pokemon>;
  query: string = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  /**
   * allows to load more pokemon from the API when you scroll
   */
  onScroll(): void{
    this.pokemonService.getPokemonParams(10, this.pokemons?.data.length, this.query).subscribe({
    next: (pagedData) => {
      if(this.pokemons) {
        this.pokemons.data = this.pokemons.data.concat(pagedData.data);
      }
    }});
  }

  /**
   * emits the pokemon's id
   * @param pokemon
   */
  selectPokemon(pokemon : Pokemon ): void {
    this.selected.emit(pokemon.id);
  }

  /**
   * allows to search the API from the query informations
   *
   * return (single pokemon / list with common letter)
   * @param q query string
   */
  search(q: string): void {
    this.query =q;
    (<HTMLElement>this.liste?.nativeElement).firstElementChild?.scrollIntoView();
    this.getPokemons();
  }

  /**
   * Use when the user clicks on the trash can to clear the query
   */
  clearSearch() {
    this.query = '';
    (<HTMLElement>this.liste?.nativeElement).firstElementChild?.scrollIntoView();
    this.getPokemons();
  }

  /**
   * Function to retrieve from the pokemonService our pokemon PagedData
   */
  getPokemons(): void {
    this.pokemonService.getPokemonParams(20,0,this.query).subscribe({
      next: (pagedData) => {
        this.pokemons = pagedData;
      }
    });
  }
}
