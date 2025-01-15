/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from 'next/navigation';
import { fetchPokemonData } from '@/components/utils/fetchPokemonData';
import PokemonById from '@/components/ui/pokemon-by-id/pokemon-by-id';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const { formattedPokemon, evolutions, headerData } = await fetchPokemonData(
      id
    );
    return (
      <PokemonById
        formattedPokemon={formattedPokemon}
        evolutions={evolutions}
        headerData={headerData}
      />
    );
  } catch (error) {
    notFound();
  }
}
