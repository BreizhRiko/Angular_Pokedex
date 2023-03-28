import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';

import { TeamsComponent } from './teams/teams.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent,
    TeamsComponent
  ],
  exports: [MatSidenavModule],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    RouterModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule
  ]
})
export class PokemonsModule {

 }
