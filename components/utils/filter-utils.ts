import type { Filters, Pokemon, SimplePokemon } from '../types';

export function getInitialFilters(searchParams: URLSearchParams): Filters {
  return {
    types: searchParams.get('types')?.split(',').filter(Boolean) || [],
    generation: searchParams.get('generation')?.split(',').filter(Boolean) || [],
    abilities: searchParams.get('abilities')?.split(',').filter(Boolean) || [],
    habitat: searchParams.get('habitat')?.split(',').filter(Boolean) || [],
    shape: searchParams.get('shape')?.split(',').filter(Boolean) || [],
    color: searchParams.get('color')?.split(',').filter(Boolean) || [],
    legendary: searchParams.get('legendary') === 'true',
    mythical: searchParams.get('mythical') === 'true',
  };
}

export function filterPokemon(
  allPokemon: SimplePokemon[],
  detailsMap: Map<string, Pokemon>,
  searchQuery: string,
  filters: Filters,
): SimplePokemon[] {
  const query = searchQuery.toLowerCase();

  return allPokemon.filter((pokemon) => {
    if (!pokemon.name.toLowerCase().includes(query)) return false;

    const details = detailsMap.get(pokemon.name);
    if (!details) return true;

    if (
      filters.types.length > 0 &&
      !details.types.some((t) =>
        filters.types.includes(t.type.name.toLowerCase()),
      )
    )
      return false;

    if (
      filters.generation.length > 0 &&
      !filters.generation.includes(
        details.generation?.name.split('-')[1]?.toUpperCase() ?? '',
      )
    )
      return false;

    if (
      filters.abilities.length > 0 &&
      !details.abilities.some((a) =>
        filters.abilities.includes(a.ability.name.toLowerCase()),
      )
    )
      return false;

    if (
      filters.habitat.length > 0 &&
      !filters.habitat.includes(details.habitat?.name.toLowerCase() ?? '')
    )
      return false;

    if (
      filters.shape.length > 0 &&
      !filters.shape.includes(details.shape?.name.toLowerCase() ?? '')
    )
      return false;

    if (
      filters.color.length > 0 &&
      !filters.color.includes(details.color?.name.toLowerCase() ?? '')
    )
      return false;

    if (filters.legendary && !details.is_legendary) return false;
    if (filters.mythical && !details.is_mythical) return false;

    return true;
  });
}
