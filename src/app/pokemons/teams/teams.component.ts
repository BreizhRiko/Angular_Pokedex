import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Team } from '../../model/team';
import { Pokemon } from '../../model/pokemon';
import { TeamPokemonService } from '../../services/team-pokemon.service';
import { PokemonService } from '../../services/pokemon.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  accesToken!: string | null | undefined;
  team: Pokemon[] = [];
  listeId!: number[];

  constructor(private teamPokemonService : TeamPokemonService, private pokemonS : PokemonService) { }

  ngOnInit() {
    console.log("team");


    this.getTeamPokemon();
  }

  getTeamPokemon(): void {
    this.teamPokemonService.getData().subscribe({
      next: (value) => {
        console.log(value);
        this.listeId = value;

        this.team = [];
        for (let index = 0; index < value.length; index++) {
          this.pokemonS.getPokemon(value[index]).subscribe(pokemon => {
            this.team.push(pokemon);
          })
        }
        console.log(this.team);

      }
    });
  }

  postTeamPokemon(): void {
    this.teamPokemonService.sendData(this.listeId).subscribe({
      next: (reponse) => {
        console.log(reponse);
      }
    })
  }

}
