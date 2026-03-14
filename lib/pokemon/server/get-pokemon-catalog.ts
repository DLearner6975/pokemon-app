import { unstable_cache } from 'next/cache';
import { fetchPokemonCatalogRecords } from '@/lib/pokemon/api/catalog';
import { normalizePokemonEntity } from '@/lib/pokemon/model/normalize';
import { createPokemonCatalog, createPokemonInitialState } from '@/lib/pokemon/state/initial-state';

const getCachedCatalogEntities = unstable_cache(
  async () => {
    const records = await fetchPokemonCatalogRecords();
    return records.map(({ details, species }) =>
      normalizePokemonEntity(details, species),
    );
  },
  ['pokemon-catalog-entities'],
  { revalidate: 60 * 60 * 24 },
);

export async function getPokemonCatalog(searchParams?: Record<string, string | string[] | undefined>) {
  const entities = await getCachedCatalogEntities();
  return createPokemonInitialState({ entities, searchParams });
}

export async function getPokemonCatalogSummary() {
  const entities = await getCachedCatalogEntities();
  const catalog = createPokemonCatalog(entities);

  return catalog.ids.map((id) => {
    const entity = catalog.entitiesById[id];

    return {
      id: entity.id.toString(),
      name: entity.name.charAt(0).toUpperCase() + entity.name.slice(1),
      slug: entity.slug,
    };
  });
}
