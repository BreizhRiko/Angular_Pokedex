import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';

import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';

import { PokedexComponent } from './pokemons/pokedex/pokedex.component';

import { AuthComponent } from './auth/auth.component';

import { TeamsComponent } from './pokemons/teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'team', component: TeamsComponent },
  { path: 'list', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
