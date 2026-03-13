import { Suspense } from 'react';
import ProjectDashboard from '@/components/ui/project-dashboard';
import { Pokemon } from '@/components/types';
import { getPokemonList } from '@/components/utils/fetchPokemonData';
import { fetchPokemonLight } from '@/components/utils/pokemon-utils';

export default async function Page() {
  const allPokemon = await getPokemonList();

  const initialResults = await Promise.all(
    allPokemon.slice(0, 8).map(fetchPokemonLight),
  );
  const initialPokemonDetails = initialResults.filter(
    (p): p is Pokemon => p !== null,
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
