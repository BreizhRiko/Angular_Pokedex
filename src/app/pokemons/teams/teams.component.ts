import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../model/pokemon';
import { TeamPokemonService } from '../../services/team-pokemon.service';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  accesToken!: string | null | undefined;
  teamPokemon: Pokemon[] = [];
  tempTeamPokemon: Pokemon[] = [];
  connected: boolean = false;

  constructor(
    private teamPokemonService : TeamPokemonService,
    private pokemonS : PokemonService,
    private router: Router) { }

  ngOnInit() {
    this.getTeamPokemon();
  }

  /**
   * get the pokemon team from the API
   * if you have a token access
   */
  getTeamPokemon(): void {
    if(localStorage.getItem('acces_token') !=  ""){this.connected = true;}else{this.connected = false;}

    this.teamPokemonService.getData().subscribe({
      next: (value) => {
        this.teamPokemonService.teamId = value;

        if(value.length != 0){
          const observables = value.map(id => this.pokemonS.getPokemon(id));

          forkJoin(observables).subscribe(team => {
            this.teamPokemon = team;
          });
        } else {
          this.teamPokemon = [];
        }
      }
    });
  }

  /**
   * Adds the new table id to the API servs
   */
  putTeamPokemon(): void {
    this.teamPokemonService.sentDataPut().subscribe({
      next: (reponse) => {
        this.getTeamPokemon();
      }
    })
  }

  /**
   * Shift our pokemon to the left
   * and send the new array to the API
   * and refreshes the display
   *
   * @param pokemon informations
   */
  moveLeft(pokemon: Pokemon): void {
    const currentIndex = this.teamPokemon.indexOf(pokemon);
    const previousIndex = currentIndex - 1;
    this.swapPokemonsId(currentIndex, previousIndex);
    }

  /**
   * Shift our pokemon to the right
   * and send the new array to the API
   * and refreshes the display
   *
   * @param pokemon informations
   */
  moveRight(pokemon: Pokemon): void {
    const currentIndex = this.teamPokemon.indexOf(pokemon);
    const nextIndex = currentIndex + 1;
    this.swapPokemonsId(currentIndex, nextIndex);
  }

  /**
   * swap 2 pokemon together based on their id
   * @param currentIndex index of pokemon 1 in table
   * @param nextIndex index of pokemon 2 in table
   */
  swapPokemonsId(currentIndex: number, nextIndex: number) {
    const temp = this.teamPokemonService.teamId[currentIndex];
    this.teamPokemonService.teamId[currentIndex] = this.teamPokemonService.teamId[nextIndex];
    this.teamPokemonService.teamId[nextIndex] = temp;

    this.putTeamPokemon();
  }

  /**
   * remove the selected pokemon from the team
   * and sends the new array to the API
   * @param pokemon informations
   */
  remove(pokemon: Pokemon): void {
    const index = this.teamPokemon.indexOf(pokemon);
    if (index !== -1) {
      this.teamPokemonService.teamId.splice(index, 1);
    }
    this.putTeamPokemon();
  }

  /**
   * navigate to : /pokedex
   */
  goToPokedex(): void{
    this.router.navigate(['pokedex']);
  }
}
