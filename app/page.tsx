import { Suspense } from 'react';
import ProjectDashboard from '@/components/ui/project-dashboard';
import { Pokemon, SimplePokemon } from '@/components/types';

async function fetchAllPokemon() {
  let allPokemon: SimplePokemon[] = [];
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  while (url) {
    const response = await fetch(url);
    const data = await response.json();
    allPokemon = [...allPokemon, ...data.results];
    url = data.next;
  }

  return allPokemon;
}

async function fetchPokemonDetails(pokemon: SimplePokemon): Promise<Pokemon> {
  const response = await fetch(pokemon.url);
  return response.json();
}

export default async function Page() {
  const allPokemon = await fetchAllPokemon();

  // Fetch details for the first 151 Pokemon (for performance reasons)
  const initialPokemonDetails = await Promise.all(
    allPokemon.slice(0, 12).map(fetchPokemonDetails)
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
