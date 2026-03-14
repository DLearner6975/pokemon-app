import {
  formatEvolutionData,
  formatHeaderData,
  formatPokemonData,
} from '@/components/utils/pokemon-data-formatter';
import {
  getEvolutionChain,
  getPokemon,
  getSpecies,
  getTypeData,
} from '@/lib/pokemon/api/detail';
import { getPokemonCatalogSummary } from '@/lib/pokemon/server/get-pokemon-catalog';

interface DetailPokemon {
  types: Array<{ type: { url: string } }>;
}

interface DetailSpecies {
  evolution_chain: { url: string };
}

function unwrapSettled<T>(result: PromiseSettledResult<T>): T {
  if (result.status === 'fulfilled') return result.value;
  throw result.reason;
}

export async function getPokemonDetailPage(id: string) {
  const [pokemonResult, speciesResult, pokemonListResult] =
    await Promise.allSettled([
      getPokemon(id),
      getSpecies(id),
      getPokemonCatalogSummary(),
    ]);

  const pokemon = unwrapSettled(pokemonResult) as DetailPokemon;
  const species = unwrapSettled(speciesResult) as DetailSpecies;
  const pokemonList = unwrapSettled(pokemonListResult);

  const evolutionAndTypeResults = await Promise.allSettled([
    getEvolutionChain(species.evolution_chain.url),
    ...pokemon.types.map((type: { type: { url: string } }) =>
      getTypeData(type.type.url),
    ),
  ]);

  const evolutionChain = unwrapSettled(evolutionAndTypeResults[0]);
  const typeData = evolutionAndTypeResults
    .slice(1)
    .map((result) => unwrapSettled(result));

  const formattedPokemon = formatPokemonData(pokemon, species, typeData);
  const evolutions = formatEvolutionData(evolutionChain).map((evolution) => ({
    ...evolution,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${evolution.id}.png`,
  }));

  const currentIndex = pokemonList.findIndex(
    (item) => item.name.toLowerCase() === formattedPokemon.name.toLowerCase(),
  );

  const headerData = formatHeaderData(formattedPokemon, pokemonList, currentIndex);

  return {
    formattedPokemon,
    evolutions,
    headerData,
  };
}
