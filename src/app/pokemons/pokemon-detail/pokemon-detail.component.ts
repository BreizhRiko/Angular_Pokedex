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

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location,
    private router: Router,
    private teamS: TeamPokemonService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id!=0){
      this.pokemonService.getPokemon(id).subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.playAudio(id);
        }});
    }
  }

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

  addPokemonToTeam(id: number): void{
    if(this.teamS.teamId.length < 6){
      this.teamS.teamId.push(id);

      console.log("teamId : ",this.teamS.teamId);

      this.teamS.sentDataPut().subscribe({
        next: (reponse) => {
          console.log(reponse);

          this.teamS.getData().subscribe({
            next: (value) => {
              console.log("get data : ",value);
              this.teamS.teamId = value;
            }
          });
        }
      })
    }
    else{

      
    }
  }



  goToTeam(): void{
    this.router.navigate(['team']);
  }

  playAudio(id: number): void {
    const audio = new Audio();
    audio.src = "../../../assets/audio/"+id+".mp3";
    audio.load();
    audio.play();
  }

  formatNumber(num: number, width: number): string {
    return num.toString().padStart(width, '0');
  }

}
