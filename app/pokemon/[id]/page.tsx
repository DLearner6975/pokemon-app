import { notFound } from 'next/navigation';
import { fetchPokemonData } from '@/components/utils/fetchPokemonData';
import PokemonById from '@/components/ui/pokemon-by-id/pokemon-by-id';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const { formattedPokemon, evolutions, headerData } = await fetchPokemonData(
      id
    );
    console.log('🚀 ~ formattedPokemon:', formattedPokemon);
    return (
      <PokemonById
        formattedPokemon={formattedPokemon}
        evolutions={evolutions}
        headerData={headerData}
      />
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }
}
