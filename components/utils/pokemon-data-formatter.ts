/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
interface PokemonData {
  id: string;
  name: string;
  description: string;
  height: string;
  weight: string;
  category: string;
  abilities: string[];
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  images: string[];
}

interface Evolution {
  id: string;
  name: string;
  types: string[];
}

interface HeaderData {
  prevPokemon: { id: string; name: string } | null;
  nextPokemon: { id: string; name: string } | null;
  currentPokemon: { id: string; name: string };
  allPokemon: { id: string; name: string }[];
}

export function getTypeColor(type: string): string {
  const typeColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  return typeColors[type.toLowerCase()] || '#777777'; // Default color if type not found
}

export function formatPokemonData(
  pokemon: any,
  species: any,
  typeData: any[]
): PokemonData {
  const damageRelations = typeData.reduce(
    (acc, type) => {
      Object.entries(type.damage_relations).forEach(([key, value]) => {
        acc[key] = [
          ...new Set([...(acc[key] || []), ...value.map((t: any) => t.name)]),
        ];
      });
      return acc;
    },
    {
      double_damage_from: [],
      double_damage_to: [],
      half_damage_from: [],
      half_damage_to: [],
      no_damage_from: [],
      no_damage_to: [],
    }
  );

  return {
    id: pokemon.id.toString(),
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    description:
      species.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      )?.flavor_text || '',
    height: `${pokemon.height / 10} m`,
    weight: `${pokemon.weight / 10} kg`,
    category:
      species.genera.find((genus: any) => genus.language.name === 'en')
        ?.genus || '',
    abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
    types: pokemon.types.map((type: any) => type.type.name),
    stats: {
      hp:
        pokemon.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat ||
        0,
      attack:
        pokemon.stats.find((stat: any) => stat.stat.name === 'attack')
          ?.base_stat || 0,
      defense:
        pokemon.stats.find((stat: any) => stat.stat.name === 'defense')
          ?.base_stat || 0,
      specialAttack:
        pokemon.stats.find((stat: any) => stat.stat.name === 'special-attack')
          ?.base_stat || 0,
      specialDefense:
        pokemon.stats.find((stat: any) => stat.stat.name === 'special-defense')
          ?.base_stat || 0,
      speed:
        pokemon.stats.find((stat: any) => stat.stat.name === 'speed')
          ?.base_stat || 0,
    },
    images: [
      pokemon.sprites.other['official-artwork'].front_default,
      pokemon.sprites.front_default,
      pokemon.sprites.back_default,
    ].filter(Boolean),
    color: species?.color.name,
    damageRelations,
  };
}

export function formatEvolutionData(evolutionChain: any): Evolution[] {
  const evolutions = [];
  let evoData = evolutionChain.chain;
  do {
    evolutions.push({
      id: evoData.species.url.split('/').slice(-2, -1)[0],
      name: evoData.species.name,
      types: [], // We would need to fetch this separately for each evolution
    });
    evoData = evoData.evolves_to[0];
  } while (evoData && evoData.hasOwnProperty('evolves_to'));
  return evolutions;
}

export function formatHeaderData(
  currentPokemon: PokemonData,
  pokemonList: any[],
  currentIndex: number
): HeaderData {
  const prevPokemon = currentIndex > 0 ? pokemonList[currentIndex - 1] : null;
  const nextPokemon =
    currentIndex < pokemonList.length - 1
      ? pokemonList[currentIndex + 1]
      : null;

  return {
    prevPokemon: prevPokemon
      ? {
          id: currentIndex.toString(),
          name:
            prevPokemon.name.charAt(0).toUpperCase() +
            prevPokemon.name.slice(1),
        }
      : null,
    nextPokemon: nextPokemon
      ? {
          id: (currentIndex + 2).toString(),
          name:
            nextPokemon.name.charAt(0).toUpperCase() +
            nextPokemon.name.slice(1),
        }
      : null,
    currentPokemon: {
      id: currentPokemon.id,
      name: currentPokemon.name,
    },
    allPokemon: pokemonList.map((p: any, index: number) => ({
      id: (index + 1).toString(),
      name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
    })),
  };
}
