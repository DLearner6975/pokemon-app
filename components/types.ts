export interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  height: number;
  weight: number;
  base_experience: number;
  is_legendary: boolean;
  is_mythical: boolean;
  habitat?: { name: string };
  shape?: { name: string };
  color?: { name: string };
  generation?: { name: string };
}

export interface SimplePokemon {
  name: string;
  url: string;
}

/*Filter Types*/
export interface Filters {
  types: string[];
  generation: string[];
  abilities: string[];
  habitat: string[];
  shape: string[];
  color: string[];
  legendary: boolean;
  mythical: boolean;
}

export interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
  initialFilters: Filters;
}

export interface PokemonCardProps {
  details: Pokemon;
}

export const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-400',
  fairy: 'bg-pink-300',
};

export const backgroundColorMap: { [key: string]: string } = {
  black: 'bg-black',
  blue: 'bg-blue-500',
  brown: 'bg-yellow-800', // Closest match for brown
  gray: 'bg-gray-500',
  green: 'bg-green-500',
  pink: 'bg-pink-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  white: 'bg-gray-200',
  yellow: 'bg-yellow-500',
};

export const shadowColorMap: { [key: string]: string } = {
  black: 'shadow-black',
  blue: 'shadow-blue-500',
  brown: 'shadow-yellow-800', // Closest match for brown
  gray: 'shadow-gray-500',
  green: 'shadow-green-500',
  pink: 'shadow-pink-500',
  purple: 'shadow-purple-500',
  red: 'shadow-red-500',
  white: 'shadow-silver-500',
  yellow: 'shadow-yellow-500',
};
