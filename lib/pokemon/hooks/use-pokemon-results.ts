import { useDeferredValue, useMemo } from 'react';
import {
  selectCurrentPageIds,
  selectCurrentPageItems,
  selectFilteredIds,
  selectTotalPages,
} from '@/lib/pokemon/model/selectors';
import { usePokemonStore } from '@/lib/pokemon/hooks/use-pokemon-store';

export function usePokemonResults() {
  const { state, dispatch } = usePokemonStore();
  const deferredQuery = useDeferredValue(state.searchQuery);

  const filteredIds = useMemo(
    () => selectFilteredIds(state, deferredQuery),
    [deferredQuery, state],
  );

  const currentPageIds = useMemo(
    () => selectCurrentPageIds(state, filteredIds),
    [filteredIds, state],
  );

  const currentPageItems = useMemo(
    () => selectCurrentPageItems(state, filteredIds),
    [filteredIds, state],
  );

  const totalPages = useMemo(
    () => selectTotalPages(state, filteredIds),
    [filteredIds, state],
  );

  return useMemo(
    () => ({
      currentPage: state.pagination.page,
      currentPageIds,
      currentPageItems,
      filteredIds,
      totalCount: filteredIds.length,
      totalPages,
      pageSize: state.pagination.pageSize,
      setPage: (page: number) =>
        dispatch({ type: 'pageChanged', payload: page }),
    }),
    [
      currentPageIds,
      currentPageItems,
      dispatch,
      filteredIds,
      state.pagination.page,
      state.pagination.pageSize,
      totalPages,
    ],
  );
}
