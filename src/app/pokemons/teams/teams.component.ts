import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../model/pokemon';
import { TeamPokemonService } from '../../services/team-pokemon.service';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  accesToken!: string | null | undefined;
  teamPokemon: Pokemon[] = [];
  tempTeamPokemon: Pokemon[] = [];

  constructor(private teamPokemonService : TeamPokemonService, private pokemonS : PokemonService) { }

  ngOnInit() {
    console.log("team");
    //a changer
    this.getTeamPokemon();
  }

  getTeamPokemon(): void {
    console.log("Get Team");

    this.teamPokemonService.getData().subscribe({
      next: (value) => {
        console.log(value);
        this.teamPokemonService.teamId = value;

        const observables = value.map(id => this.pokemonS.getPokemon(id));

        forkJoin(observables).subscribe(team => {
          this.teamPokemon = team;
          console.log(this.teamPokemon);
        });
      }
    });
  }

  putTeamPokemon(): void {
    console.log("Post Team");
    this.teamPokemonService.sentDataPut().subscribe({
      next: (reponse) => {
        console.log(reponse);
        this.getTeamPokemon();
      }
    })
  }

  moveLeft(pokemon: Pokemon): void {
    const currentIndex = this.teamPokemon.indexOf(pokemon);
    const previousIndex = currentIndex - 1;
    this.swapPokemonsId(currentIndex, previousIndex);
    }

  moveRight(pokemon: Pokemon): void {
    const currentIndex = this.teamPokemon.indexOf(pokemon);
    const nextIndex = currentIndex + 1;
    this.swapPokemonsId(currentIndex, nextIndex);
  }

  swapPokemonsId(currentIndex: number, nextIndex: number) {
    const temp = this.teamPokemonService.teamId[currentIndex];
    this.teamPokemonService.teamId[currentIndex] = this.teamPokemonService.teamId[nextIndex];
    this.teamPokemonService.teamId[nextIndex] = temp;
    console.log(this.teamPokemonService.teamId);

    this.putTeamPokemon();
  }

  remove(pokemon: Pokemon): void {
    const index = this.teamPokemon.indexOf(pokemon);
    console.log(index);
    if (index !== -1) {
      this.teamPokemonService.teamId.splice(index, 1);
    }
    this.putTeamPokemon();
  }

}
