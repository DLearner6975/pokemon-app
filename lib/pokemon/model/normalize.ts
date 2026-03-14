import type {
  PokemonCatalog,
  PokemonFilterState,
  PokemonListEntity,
  RawPokemonDetails,
  RawPokemonSpecies,
} from '@/lib/pokemon/model/types';

const FALLBACK_IMAGE = '/placeholder.svg';

export function normalizePokemonEntity(
  details: RawPokemonDetails,
  species: RawPokemonSpecies,
): PokemonListEntity {
  const artworkUrl =
    details.sprites.other?.home?.front_default ||
    details.sprites.other?.dream_world?.front_default ||
    details.sprites.other?.['official-artwork']?.front_default ||
    details.sprites.front_default ||
    FALLBACK_IMAGE;

  return {
    id: details.id,
    name: details.name,
    slug: details.name,
    imageUrl: details.sprites.front_default || artworkUrl,
    artworkUrl,
    backImageUrl: details.sprites.back_default || FALLBACK_IMAGE,
    types: details.types.map((item) => item.type.name.toLowerCase()),
    abilities: details.abilities.map((item) =>
      item.ability.name.toLowerCase(),
    ),
    stats: details.stats.map((item) => ({
      name: item.stat.name,
      baseStat: item.base_stat,
    })),
    height: details.height,
    weight: details.weight,
    baseExperience: details.base_experience,
    generation: normalizeSpeciesValue(species.generation?.name),
    habitat: normalizeSpeciesValue(species.habitat?.name),
    shape: normalizeSpeciesValue(species.shape?.name),
    color: normalizeSpeciesValue(species.color?.name),
    isLegendary: species.is_legendary ?? false,
    isMythical: species.is_mythical ?? false,
  };
}

export function normalizeSpeciesValue(value?: string | null) {
  if (!value) return null;
  return value.toLowerCase();
}

export function buildCatalog(entities: PokemonListEntity[]): PokemonCatalog {
  const sortedEntities = [...entities].sort((left, right) => left.id - right.id);

  return {
    entitiesById: Object.fromEntries(
      sortedEntities.map((entity) => [entity.id, entity]),
    ),
    ids: sortedEntities.map((entity) => entity.id),
    idsByName: Object.fromEntries(
      sortedEntities.map((entity) => [entity.name.toLowerCase(), entity.id]),
    ),
    indexes: {
      type: {},
      generation: {},
      habitat: {},
      shape: {},
      color: {},
      legendary: [],
      mythical: [],
    },
  };
}

export function getEmptyFilters(): PokemonFilterState {
  return {
    types: [],
    generation: [],
    habitat: [],
    shape: [],
    color: [],
    legendary: false,
    mythical: false,
  };
}
