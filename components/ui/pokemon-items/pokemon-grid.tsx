import { PokemonCard } from './pokemon-card';
import { usePokemonResults } from '@/lib/pokemon/hooks/use-pokemon-results';

export function PokemonGrid() {
  const { currentPageItems } = usePokemonResults();

  if (currentPageItems.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-gray-500">
        No Pokemon found matching your search and filters.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {currentPageItems.map((pokemon) => (
          <PokemonCard key={pokemon.id} details={pokemon} />
        ))}
      </div>
    </div>
  );
}
