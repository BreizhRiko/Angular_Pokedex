import { Pokemon } from './../../pokemon';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from 'src/app/services/pokemon.service';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})

export class PokemonDetailComponent implements OnInit {
  @Input() pokemon?: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) { }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemon(id).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.playAudio(id);

      }})
    ;
  }

  playAudio(id: number): void {
    const audio = new Audio();
    audio.src = "../../../assets/audio/"+id+".mp3";
    audio.load();
    audio.play();
  }

}
