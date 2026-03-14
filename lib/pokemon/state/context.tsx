'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { PokemonStoreAction } from '@/lib/pokemon/state/actions';
import { pokemonStoreReducer } from '@/lib/pokemon/state/reducer';
import { createEmptyPokemonState, serializePokemonSearchParams } from '@/lib/pokemon/state/initial-state';
import type { PokemonStoreState } from '@/lib/pokemon/model/types';

const PokemonStoreStateContext = createContext<PokemonStoreState | null>(null);
const PokemonStoreDispatchContext = createContext<
  React.Dispatch<PokemonStoreAction> | null
>(null);

export function PokemonStoreContextProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: PokemonStoreState;
}) {
  const [state, dispatch] = useReducer(
    pokemonStoreReducer,
    initialState,
    (value) => value ?? createEmptyPokemonState(),
  );
  const router = useRouter();
  const pathname = usePathname() || '/';

  useEffect(() => {
    const queryString = serializePokemonSearchParams(
      state.filters,
      state.searchQuery,
    );
    const href = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(href, { scroll: false });
  }, [pathname, router, state.filters, state.searchQuery]);

  const memoizedState = useMemo(() => state, [state]);

  return (
    <PokemonStoreDispatchContext.Provider value={dispatch}>
      <PokemonStoreStateContext.Provider value={memoizedState}>
        {children}
      </PokemonStoreStateContext.Provider>
    </PokemonStoreDispatchContext.Provider>
  );
}

export function usePokemonStoreState() {
  const context = useContext(PokemonStoreStateContext);

  if (!context) {
    throw new Error(
      'usePokemonStoreState must be used within PokemonStoreContextProvider',
    );
  }

  return context;
}

export function usePokemonStoreDispatch() {
  const context = useContext(PokemonStoreDispatchContext);

  if (!context) {
    throw new Error(
      'usePokemonStoreDispatch must be used within PokemonStoreContextProvider',
    );
  }

  return context;
}
