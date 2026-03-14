import type {
  PokemonCatalog,
  PokemonFilterKey,
  PokemonFilterState,
} from '@/lib/pokemon/model/types';

export type PokemonStoreAction =
  | { type: 'catalogLoaded'; payload: PokemonCatalog }
  | { type: 'searchChanged'; payload: string }
  | {
      type: 'filterSet';
      payload: { key: PokemonFilterKey; value: string[] };
    }
  | {
      type: 'booleanFilterSet';
      payload: { key: 'legendary' | 'mythical'; value: boolean };
    }
  | { type: 'filtersHydrated'; payload: PokemonFilterState }
  | { type: 'filtersCleared' }
  | { type: 'pageChanged'; payload: number }
  | { type: 'pageSizeChanged'; payload: number };
