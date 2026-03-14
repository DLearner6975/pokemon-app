import ProjectDashboard from '@/components/ui/project-dashboard';
import { PokemonStoreProvider } from '@/components/providers/pokemon-store-provider';
import { getPokemonCatalog } from '@/lib/pokemon/server/get-pokemon-catalog';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialState = await getPokemonCatalog(resolvedSearchParams);

  return (
    <PokemonStoreProvider initialState={initialState}>
      <ProjectDashboard />
    </PokemonStoreProvider>
  );
}
