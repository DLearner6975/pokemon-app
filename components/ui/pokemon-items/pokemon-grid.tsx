import React from 'react';
import { PokemonCard } from './pokemon-card';
import { PokemonCardSkeleton } from './pokemon-card-skeleton';
import { SimplePokemon, Pokemon } from '@/components/types';

interface PokemonGridProps {
  currentPagePokemon: SimplePokemon[];
  pokemonDetails: Pokemon[];
}

export function PokemonGrid({
  currentPagePokemon,
  pokemonDetails,
}: PokemonGridProps) {
  if (currentPagePokemon.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-gray-500">
        No Pokemon found matching your search and filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {currentPagePokemon.map((pokemon, index) => {
        const details = pokemonDetails.find(
          (detail) => detail.name === pokemon.name
        );

        const displayImageUrl =
          // @ts-expect-error The other property is not recognized by TypeScript
          details?.sprites?.other?.dream_world?.front_default ||
          details?.sprites?.front_default;
        return details ? (
          <PokemonCard
            key={details.id - index}
            name={details.name}
            number={details.id}
            imageUrl={displayImageUrl}
            types={details.types.map((type) => type.type.name)}
            abilities={details.abilities.map((ability) => ability.ability.name)}
          />
        ) : (
          <PokemonCardSkeleton key={pokemon.name} />
        );
      })}
    </div>
  );
}
