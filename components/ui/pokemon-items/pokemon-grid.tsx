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
    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {currentPagePokemon.map((pokemon) => {
          const details = pokemonDetails.find(
            (detail) => detail.name === pokemon.name
          );

          return details ? (
            <PokemonCard key={details.id} details={details} />
          ) : (
            <PokemonCardSkeleton key={pokemon.name} />
          );
        })}
      </div>
    </div>
  );
}
