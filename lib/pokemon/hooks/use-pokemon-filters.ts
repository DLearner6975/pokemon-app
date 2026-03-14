import { useCallback, useMemo } from 'react';
import type { PokemonFilterKey } from '@/lib/pokemon/model/types';
import { usePokemonStore } from '@/lib/pokemon/hooks/use-pokemon-store';

export function usePokemonFilters() {
  const { state, dispatch } = usePokemonStore();

  const setSearchQuery = useCallback(
    (value: string) => {
      dispatch({ type: 'searchChanged', payload: value });
    },
    [dispatch],
  );

  const setFilter = useCallback(
    (key: PokemonFilterKey, value: string[]) => {
      dispatch({ type: 'filterSet', payload: { key, value } });
    },
    [dispatch],
  );

  const setBooleanFilter = useCallback(
    (key: 'legendary' | 'mythical', value: boolean) => {
      dispatch({ type: 'booleanFilterSet', payload: { key, value } });
    },
    [dispatch],
  );

  const clearFilters = useCallback(() => {
    dispatch({ type: 'filtersCleared' });
  }, [dispatch]);

  const totalActiveFilters = useMemo(() => {
    let count = 0;

    for (const value of Object.values(state.filters)) {
      if (Array.isArray(value)) {
        count += value.length;
      } else if (value) {
        count += 1;
      }
    }

    return count;
  }, [state.filters]);

  return useMemo(
    () => ({
      filters: state.filters,
      searchQuery: state.searchQuery,
      totalActiveFilters,
      setSearchQuery,
      setFilter,
      setBooleanFilter,
      clearFilters,
    }),
    [
      clearFilters,
      setBooleanFilter,
      setFilter,
      setSearchQuery,
      state.filters,
      state.searchQuery,
      totalActiveFilters,
    ],
  );
}
