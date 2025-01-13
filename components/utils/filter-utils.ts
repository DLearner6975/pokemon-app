import { Filters, Pokemon, SimplePokemon } from '../types';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const types = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];
export const generations = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
];
export const habitats = [
  'cave',
  'forest',
  'grassland',
  'mountain',
  'rare',
  'rough-terrain',
  'sea',
  'urban',
  'waters-edge',
];

export const shapes = [
  'ball',
  'squiggle',
  'fish',
  'arms',
  'blob',
  'upright',
  'legs',
  'quadruped',
  'wings',
  'tentacles',
  'heads',
  'humanoid',
  'bug-wings',
  'armor',
];

export const colors = [
  'black',
  'blue',
  'brown',
  'gray',
  'green',
  'pink',
  'purple',
  'red',
  'white',
  'yellow',
];

export function getInitialFilters(searchParams: URLSearchParams): Filters {
  return {
    types: searchParams.get('types')?.split(',') || [],
    generation: searchParams.get('generation')?.split(',') || [],
    abilities: searchParams.get('abilities')?.split(',') || [],
    habitat: searchParams.get('habitat')?.split(',') || [],
    shape: searchParams.get('shape')?.split(',') || [],
    color: searchParams.get('color')?.split(',') || [],
    baseExperience: {
      min: parseInt(searchParams.get('base_exp_min') || '0'),
      max: parseInt(searchParams.get('base_exp_max') || '1000'),
    },
    legendary: searchParams.get('legendary') === 'true',
    mythical: searchParams.get('mythical') === 'true',
  };
}

export function filterPokemon(
  allPokemon: SimplePokemon[],
  pokemonDetails: Pokemon[],
  searchQuery: string,
  filters: Filters
): SimplePokemon[] {
  return allPokemon.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const details = pokemonDetails.find((p) => p.name === pokemon.name);

    if (!details) return matchesSearch; // If we don't have details yet, only filter by search

    const matchesFilters = () => {
      if (
        filters.types.length > 0 &&
        !details.types.some((t) =>
          filters.types.includes(t.type.name.toLowerCase())
        )
      )
        return false;
      if (
        filters.generation.length > 0 &&
        !filters.generation.includes(
          details.generation?.name.split('-')[1].toUpperCase() || ''
        )
      )
        return false;
      if (
        filters.abilities.length > 0 &&
        !details.abilities.some((a) =>
          filters.abilities.includes(a.ability.name.toLowerCase())
        )
      )
        return false;
      if (
        filters.habitat.length > 0 &&
        !filters.habitat.includes(details.habitat?.name.toLowerCase() || '')
      )
        return false;
      if (
        filters.shape.length > 0 &&
        !filters.shape.includes(details.shape?.name.toLowerCase() || '')
      )
        return false;
      if (
        filters.color.length > 0 &&
        !filters.color.includes(details.color?.name.toLowerCase() || '')
      )
        return false;
      if (
        details.base_experience < filters.baseExperience.min ||
        details.base_experience > filters.baseExperience.max
      )
        return false;
      if (filters.legendary && !details.is_legendary) return false;
      if (filters.mythical && !details.is_mythical) return false;

      return true;
    };

    return matchesSearch && matchesFilters();
  });
}

export function handleFilterChange(
  newFilters: Filters,
  searchParams: URLSearchParams,
  setFilters: (filters: Filters) => void,
  setCurrentPage: (page: number) => void,
  router: AppRouterInstance,
  pathname: string
) {
  setFilters(newFilters);
  setCurrentPage(1);

  const params = new URLSearchParams(searchParams);
  Object.entries(newFilters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(','));
      } else {
        params.delete(key);
      }
    } else if (key === 'baseExperience') {
      params.set('base_exp_min', value.min.toString());
      params.set('base_exp_max', value.max.toString());
    } else if (typeof value === 'boolean') {
      if (value) {
        params.set(key, 'true');
      } else {
        params.delete(key);
      }
    }
  });

  router.push(pathname + '?' + params.toString());
}
