import type {
  PokemonFilterKey,
  PokemonFilterOption,
  PokemonFilterOptions,
  PokemonStoreState,
} from '@/lib/pokemon/model/types';

const FILTER_TO_INDEX_KEY: Record<
  PokemonFilterKey,
  'type' | 'generation' | 'habitat' | 'shape' | 'color'
> = {
  types: 'type',
  generation: 'generation',
  habitat: 'habitat',
  shape: 'shape',
  color: 'color',
};

function unionDimensionMatches(groups: number[][]): number[] {
  if (groups.length === 0) return [];

  const values = new Set<number>();
  for (const group of groups) {
    for (const id of group) {
      values.add(id);
    }
  }

  return Array.from(values);
}

function intersectSortedIds(baseIds: number[], candidateGroups: number[][]) {
  if (candidateGroups.length === 0) return baseIds;

  const sortedGroups = [...candidateGroups].sort(
    (left, right) => left.length - right.length,
  );

  let current = sortedGroups[0];

  for (let index = 1; index < sortedGroups.length; index += 1) {
    const nextSet = new Set(sortedGroups[index]);
    current = current.filter((id) => nextSet.has(id));
  }

  const allowedIds = new Set(current);
  return baseIds.filter((id) => allowedIds.has(id));
}

export function selectFilteredIds(
  state: PokemonStoreState,
  searchQuery = state.searchQuery,
) {
  const { catalog, filters } = state;
  const candidateGroups: number[][] = [];

  (Object.keys(FILTER_TO_INDEX_KEY) as PokemonFilterKey[]).forEach((key) => {
    const selectedValues = filters[key];

    if (selectedValues.length === 0) {
      return;
    }

    const indexKey = FILTER_TO_INDEX_KEY[key];
    const indexGroups = selectedValues
      .map((value) => catalog.indexes[indexKey][value] ?? [])
      .filter((group) => group.length > 0);

    if (indexGroups.length === 0) {
      candidateGroups.push([]);
      return;
    }

    candidateGroups.push(unionDimensionMatches(indexGroups));
  });

  if (filters.legendary) {
    candidateGroups.push(catalog.indexes.legendary);
  }

  if (filters.mythical) {
    candidateGroups.push(catalog.indexes.mythical);
  }

  let filteredIds = intersectSortedIds(catalog.ids, candidateGroups);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  if (!normalizedQuery) return filteredIds;

  filteredIds = filteredIds.filter((id) =>
    catalog.entitiesById[id].name.includes(normalizedQuery),
  );

  return filteredIds;
}

export function selectCurrentPageIds(
  state: PokemonStoreState,
  filteredIds = selectFilteredIds(state),
) {
  const startIndex = (state.pagination.page - 1) * state.pagination.pageSize;
  const endIndex = startIndex + state.pagination.pageSize;
  return filteredIds.slice(startIndex, endIndex);
}

export function selectCurrentPageItems(
  state: PokemonStoreState,
  filteredIds = selectFilteredIds(state),
) {
  return selectCurrentPageIds(state, filteredIds).map(
    (id) => state.catalog.entitiesById[id],
  );
}

export function selectPokemonById(state: PokemonStoreState, id: number) {
  return state.catalog.entitiesById[id] ?? null;
}

function toTitleCase(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function mapFilterOptions(
  index: Record<string, number[]>,
  formatter?: (value: string) => string,
): PokemonFilterOption[] {
  return Object.entries(index)
    .map(([value, ids]) => ({
      value,
      label: formatter ? formatter(value) : toTitleCase(value),
      count: ids.length,
    }))
    .sort((left, right) => left.label.localeCompare(right.label));
}

export function selectFilterOptions(state: PokemonStoreState): PokemonFilterOptions {
  return {
    types: mapFilterOptions(state.catalog.indexes.type),
    generation: mapFilterOptions(state.catalog.indexes.generation, (value) =>
      value.replace('generation-', '').toUpperCase(),
    ),
    habitat: mapFilterOptions(state.catalog.indexes.habitat),
    shape: mapFilterOptions(state.catalog.indexes.shape),
    color: mapFilterOptions(state.catalog.indexes.color),
  };
}

export function selectTotalPages(
  state: PokemonStoreState,
  filteredIds = selectFilteredIds(state),
) {
  return Math.max(1, Math.ceil(filteredIds.length / state.pagination.pageSize));
}
