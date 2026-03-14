import { notFound } from "next/navigation";
import PokemonById from "@/components/ui/pokemon-by-id/pokemon-by-id";
import { getPokemonDetailPage } from "@/lib/pokemon/server/get-pokemon-detail-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const { formattedPokemon, evolutions, headerData } = await getPokemonDetailPage(
      id
    );
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
