import { fetchPokeApiJson } from '@/lib/pokemon/api/client';

export async function getPokemon(id: string) {
  return fetchPokeApiJson(`pokemon/${id}`);
}

export async function getSpecies(id: string) {
  return fetchPokeApiJson(`pokemon-species/${id}`);
}

export async function getEvolutionChain(url: string) {
  return fetchPokeApiJson(url);
}

export async function getTypeData(url: string) {
  return fetchPokeApiJson(url);
}
