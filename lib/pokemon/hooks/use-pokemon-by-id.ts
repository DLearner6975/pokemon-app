import { useMemo } from 'react';
import { selectPokemonById } from '@/lib/pokemon/model/selectors';
import { usePokemonStore } from '@/lib/pokemon/hooks/use-pokemon-store';

export function usePokemonById(id: number) {
  const { state } = usePokemonStore();

  return useMemo(() => selectPokemonById(state, id), [id, state]);
}
