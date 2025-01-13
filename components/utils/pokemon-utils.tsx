import { SimplePokemon, Pokemon } from '../types';

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
