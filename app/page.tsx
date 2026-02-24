import { Suspense } from 'react';
import ProjectDashboard from '@/components/ui/project-dashboard';
import { Pokemon, SimplePokemon } from '@/components/types';
import { getPokemonList } from '@/components/utils/fetchPokemonData';

async function fetchPokemonDetails(pokemon: SimplePokemon): Promise<Pokemon> {
  const response = await fetch(pokemon.url);
  return response.json();
}

export default async function Page() {
  const allPokemon = await getPokemonList();

  // Fetch details for the first 151 Pokemon (for performance reasons)
  const initialPokemonDetails = await Promise.all(
    allPokemon.slice(0, 12).map(fetchPokemonDetails),
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectDashboard
        initialPokemon={initialPokemonDetails}
        allPokemon={allPokemon}
      />
    </Suspense>
  );
}
