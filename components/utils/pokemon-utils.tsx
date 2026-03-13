import { SimplePokemon, Pokemon } from '../types';

/** Lightweight fetch: only /pokemon/{id}, no species. For front/back card display. */
export async function fetchPokemonLight(
  pokemon: SimplePokemon
): Promise<Pokemon | null> {
  try {
    const response = await fetch(pokemon.url);
    const basicDetails = await response.json();

    return {
      ...basicDetails,
      is_legendary: false,
      is_mythical: false,
    };
  } catch (error) {
    console.error('Error fetching Pokemon (light):', error);
    return null;
  }
}

/** Species-only fetch for back card color and filtering. */
export interface PokemonSpeciesData {
  color?: { name: string };
  habitat?: { name: string };
  shape?: { name: string };
  generation?: { name: string };
  is_legendary: boolean;
  is_mythical: boolean;
}

export async function fetchPokemonSpecies(
  id: string | number
): Promise<PokemonSpeciesData | null> {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      color: data.color,
      habitat: data.habitat,
      shape: data.shape,
      generation: data.generation,
      is_legendary: data.is_legendary ?? false,
      is_mythical: data.is_mythical ?? false,
    };
  } catch (error) {
    console.error('Error fetching Pokemon species:', error);
    return null;
  }
}

export async function fetchPokemonDetails(
  pokemon: SimplePokemon
): Promise<Pokemon | null> {
  try {
    const response = await fetch(pokemon.url);
    const basicDetails = await response.json();

    const speciesResponse = await fetch(basicDetails.species.url);
    const speciesDetails = await speciesResponse.json();

    return {
      ...basicDetails,
      habitat: speciesDetails.habitat,
      shape: speciesDetails.shape,
      color: speciesDetails.color,
      generation: speciesDetails.generation,
      is_legendary: speciesDetails.is_legendary,
      is_mythical: speciesDetails.is_mythical,
    };
  } catch (error) {
    console.error('Error fetching Pokemon details:', error);
    return null;
  }
}
