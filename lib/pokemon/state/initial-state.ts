import { buildCatalog, getEmptyFilters } from '@/lib/pokemon/model/normalize';
import { attachIndexes } from '@/lib/pokemon/model/indexes';
import type {
  PokemonCatalog,
  PokemonFilterState,
  PokemonListEntity,
  PokemonStoreState,
} from '@/lib/pokemon/model/types';

const DEFAULT_PAGE_SIZE = 24;

type SearchParamRecord = Record<string, string | string[] | undefined>;

function getFirstValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

function parseListValue(value?: string | string[]) {
  return getFirstValue(value)
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function parsePokemonFilters(
  searchParams?: SearchParamRecord,
): PokemonFilterState {
  return {
    types: parseListValue(searchParams?.types),
    generation: parseListValue(searchParams?.generation),
    habitat: parseListValue(searchParams?.habitat),
    shape: parseListValue(searchParams?.shape),
    color: parseListValue(searchParams?.color),
    legendary: getFirstValue(searchParams?.legendary) === 'true',
    mythical: getFirstValue(searchParams?.mythical) === 'true',
  };
}

export function parsePokemonSearchQuery(searchParams?: SearchParamRecord) {
  return getFirstValue(searchParams?.query).trim().toLowerCase();
}

export function createPokemonCatalog(entities: PokemonListEntity[]): PokemonCatalog {
  return attachIndexes(buildCatalog(entities));
}

export function createPokemonInitialState({
  entities,
  searchParams,
}: {
  entities: PokemonListEntity[];
  searchParams?: SearchParamRecord;
}): PokemonStoreState {
  return {
    catalog: createPokemonCatalog(entities),
    filters: parsePokemonFilters(searchParams),
    searchQuery: parsePokemonSearchQuery(searchParams),
    pagination: {
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    status: 'ready',
  };
}

export function createEmptyPokemonState(): PokemonStoreState {
  return {
    catalog: createPokemonCatalog([]),
    filters: getEmptyFilters(),
    searchQuery: '',
    pagination: {
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    status: 'idle',
  };
}

export function serializePokemonSearchParams(
  filters: PokemonFilterState,
  searchQuery: string,
) {
  const params = new URLSearchParams();

  if (searchQuery.trim()) {
    params.set('query', searchQuery.trim().toLowerCase());
  }

  (Object.entries(filters) as Array<[keyof PokemonFilterState, string[] | boolean]>).forEach(
    ([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      }

      if (typeof value === 'boolean' && value) {
        params.set(key, 'true');
      }
    },
  );

  return params.toString();
}
