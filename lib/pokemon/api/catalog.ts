import { fetchPokeApiJson, mapWithConcurrency } from '@/lib/pokemon/api/client';
import type {
  RawPokemonDetails,
  RawPokemonListItem,
  RawPokemonSpecies,
} from '@/lib/pokemon/model/types';

interface PokeApiListResponse<T> {
  results: T[];
}

interface CatalogRecord {
  details: RawPokemonDetails;
  species: RawPokemonSpecies;
}

const CATALOG_LIMIT = 1025;
const CATALOG_CONCURRENCY = 24;

function extractPokemonId(url: string) {
  const segments = url.split('/').filter(Boolean);
  const id = Number(segments[segments.length - 1]);

  if (Number.isNaN(id)) {
    throw new Error(`Unable to parse Pokemon id from URL: ${url}`);
  }

  return id;
}

export async function fetchPokemonListItems() {
  const data = await fetchPokeApiJson<PokeApiListResponse<RawPokemonListItem>>(
    `pokemon?limit=${CATALOG_LIMIT}&offset=0`,
  );

  return data.results;
}

export async function fetchPokemonCatalogRecords(): Promise<CatalogRecord[]> {
  const pokemonList = await fetchPokemonListItems();

  return mapWithConcurrency(pokemonList, CATALOG_CONCURRENCY, async (item) => {
    const id = extractPokemonId(item.url);
    const [details, species] = await Promise.all([
      fetchPokeApiJson<RawPokemonDetails>(item.url),
      fetchPokeApiJson<RawPokemonSpecies>(`pokemon-species/${id}`),
    ]);

    return { details, species };
  });
}

export { extractPokemonId };
