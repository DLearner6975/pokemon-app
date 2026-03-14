import { getEmptyFilters } from '@/lib/pokemon/model/normalize';
import type { PokemonStoreAction } from '@/lib/pokemon/state/actions';
import type { PokemonStoreState } from '@/lib/pokemon/model/types';

export function pokemonStoreReducer(
  state: PokemonStoreState,
  action: PokemonStoreAction,
): PokemonStoreState {
  switch (action.type) {
    case 'catalogLoaded':
      return {
        ...state,
        catalog: action.payload,
        status: 'ready',
      };
    case 'searchChanged':
      return {
        ...state,
        searchQuery: action.payload.trim().toLowerCase(),
        pagination: {
          ...state.pagination,
          page: 1,
        },
      };
    case 'filterSet':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
        pagination: {
          ...state.pagination,
          page: 1,
        },
      };
    case 'booleanFilterSet':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
        pagination: {
          ...state.pagination,
          page: 1,
        },
      };
    case 'filtersHydrated':
      return {
        ...state,
        filters: action.payload,
        pagination: {
          ...state.pagination,
          page: 1,
        },
      };
    case 'filtersCleared':
      return {
        ...state,
        filters: getEmptyFilters(),
        searchQuery: '',
        pagination: {
          ...state.pagination,
          page: 1,
        },
      };
    case 'pageChanged':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        },
      };
    case 'pageSizeChanged':
      return {
        ...state,
        pagination: {
          page: 1,
          pageSize: action.payload,
        },
      };
    default:
      return state;
  }
}
