import { useMemo } from 'react';
import {
  usePokemonStoreDispatch,
  usePokemonStoreState,
} from '@/lib/pokemon/state/context';

export function usePokemonStore() {
  const state = usePokemonStoreState();
  const dispatch = usePokemonStoreDispatch();

  return useMemo(() => ({ state, dispatch }), [dispatch, state]);
}
