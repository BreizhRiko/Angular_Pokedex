import { TestBed } from '@angular/core/testing';

import { TeamPokemonService } from './team-pokemon.service';

describe('TeamPokemonService', () => {
  let service: TeamPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
