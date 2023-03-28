import { TeamPokemonService } from 'src/app/services/team-pokemon.service';
import { TeamsComponent } from './../teams/teams.component';
import { Pokemon } from '../../model/pokemon';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})

export class PokemonDetailComponent implements OnChanges,OnInit {
  @Input() pokemonId?: number;

  pokemon?: Pokemon;
  teamLength: number = 0;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location,
    private router: Router,
    private teamS: TeamPokemonService
  ) { }

  /**
   * OnInit
   * get pokemon informations
   * and play it's audio
   */
  ngOnInit(): void {
    this.teamLength = this.teamS.teamId.length;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id!=0){
      this.pokemonService.getPokemon(id).subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.playAudio(id);
        }});
    }
  }

  /**
   * OnChange
   * get pokemon informations
   * and play it's audio
   */
  ngOnChanges(): void {
    if(this.pokemonId != null){
      const id = this.pokemonId;
      this.pokemonService.getPokemon(id).subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.playAudio(id);

        }})
      ;
    }
  }

  /**
   * add a pokemon to the user's team
   * DataPut : sends our array to the API
   * GetData : retrieve and update the team displayed from the API
   * @param id pokemon id
   */
  addPokemonToTeam(id: number): void{
    if(this.teamS.teamId.length < 6){
      this.teamS.teamId.push(id);

      this.teamS.sentDataPut().subscribe({
        next: (reponse) => {

          this.teamS.getData().subscribe({
            next: (value) => {
              this.teamS.teamId = value;
            }
          });
        }
      })

    }
    this.teamLength = this.teamS.teamId.length;
  }

/**
 * navigate to : /team
 */
  goToTeam(): void{
    this.router.navigate(['team']);
  }

  /**
   * plays the sound of selected pokemon
   * @param id Pokemon id
   */
  playAudio(id: number): void {
    const audio = new Audio();
    audio.src = "../../../assets/audio/"+id+".mp3";
    audio.load();
    audio.play();
  }

}
