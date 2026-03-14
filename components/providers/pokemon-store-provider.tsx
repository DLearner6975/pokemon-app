'use client';

import type { ReactNode } from 'react';
import type { PokemonStoreState } from '@/lib/pokemon/model/types';
import { PokemonStoreContextProvider } from '@/lib/pokemon/state/context';

export function PokemonStoreProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: PokemonStoreState;
}) {
  return (
    <PokemonStoreContextProvider initialState={initialState}>
      {children}
    </PokemonStoreContextProvider>
  );
}
