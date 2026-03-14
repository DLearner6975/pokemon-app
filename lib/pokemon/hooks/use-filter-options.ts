import { useMemo } from 'react';
import { selectFilterOptions } from '@/lib/pokemon/model/selectors';
import { usePokemonStore } from '@/lib/pokemon/hooks/use-pokemon-store';

export function useFilterOptions() {
  const { state } = usePokemonStore();

  return useMemo(() => selectFilterOptions(state), [state]);
}
