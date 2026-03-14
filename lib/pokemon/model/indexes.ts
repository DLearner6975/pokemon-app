import type {
  PokemonCatalog,
  PokemonIndexes,
  PokemonListEntity,
} from '@/lib/pokemon/model/types';

function appendIndexValue(
  index: Record<string, number[]>,
  value: string | null,
  id: number,
) {
  if (!value) return;
  if (!index[value]) {
    index[value] = [];
  }
  index[value].push(id);
}

function appendManyIndexValues(
  index: Record<string, number[]>,
  values: string[],
  id: number,
) {
  for (const value of values) {
    appendIndexValue(index, value, id);
  }
}

export function buildPokemonIndexes(
  entities: PokemonListEntity[],
): PokemonIndexes {
  const indexes: PokemonIndexes = {
    type: {},
    generation: {},
    habitat: {},
    shape: {},
    color: {},
    legendary: [],
    mythical: [],
  };

  for (const entity of entities) {
    appendManyIndexValues(indexes.type, entity.types, entity.id);
    appendIndexValue(indexes.generation, entity.generation, entity.id);
    appendIndexValue(indexes.habitat, entity.habitat, entity.id);
    appendIndexValue(indexes.shape, entity.shape, entity.id);
    appendIndexValue(indexes.color, entity.color, entity.id);

    if (entity.isLegendary) {
      indexes.legendary.push(entity.id);
    }

    if (entity.isMythical) {
      indexes.mythical.push(entity.id);
    }
  }

  return indexes;
}

export function attachIndexes(catalog: PokemonCatalog): PokemonCatalog {
  const entities = catalog.ids.map((id) => catalog.entitiesById[id]);

  return {
    ...catalog,
    indexes: buildPokemonIndexes(entities),
  };
}
