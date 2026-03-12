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
  isOpen: boolean;
  onToggle: () => void;
}

export interface PokemonCardProps {
  details: Pokemon;
  isFlipped?: boolean[];
}
export interface PokemonFrontCardProps {
  details: Pokemon;
  isFlipped: boolean[];
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
export const borderColorMap: { [key: string]: string } = {
  black: 'border-black',
  blue: 'border-blue-200',
  brown: 'border-yellow-600', // Closest match for brown
  gray: 'border-gray-200',
  green: 'border-green-200',
  pink: 'border-pink-200',
  purple: 'border-purple-200',
  red: 'border-red-200',
  white: 'border-gray-200',
  yellow: 'border-yellow-400',
};

export const statsColorMap: { [key: string]: string } = {
  black: 'bg-black-200',
  blue: 'bg-blue-700',
  brown: 'bg-yellow-900', // Closest match for brown
  gray: 'bg-gray-600',
  green: 'bg-green-700',
  pink: 'bg-pink-700',
  purple: 'bg-purple-700',
  red: 'bg-red-700',
  white: 'bg-gray-400',
  yellow: 'bg-yellow-600',
};

export const hoverColorMap: { [key: string]: string } = {
  black: 'hover:bg-black-500',
  blue: 'hover:bg-blue-400',
  brown: 'hover:bg-yellow-700', // Closest match for brown
  gray: 'hover:bg-gray-400',
  green: 'hover:bg-green-400',
  pink: 'hover:bg-pink-400',
  purple: 'hover:bg-purple-400',
  red: 'hover:bg-red-400',
  white: 'hover:bg-gray-100',
  yellow: 'hover:bg-yellow-400',
  // TODO: Below is an example of the hover to have for each color or keep it the same????
  // hover: 'hover:from-blue-600 hover:to-purple-700',
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

export const gradientColorMap: { [key: string]: string } = {
  black: 'bg-gradient-to-r from-gray-900 to-black',
  blue: 'bg-gradient-to-r from-blue-500 to-blue-400',
  brown: 'bg-gradient-to-r from-yellow-800 to-yellow-700', // Closest match for brown
  gray: 'bg-gradient-to-r from-gray-500 to-gray-400',
  green: 'bg-gradient-to-r from-green-500 to-green-400',
  pink: 'bg-gradient-to-r from-pink-500 to-pink-400',
  purple: 'bg-gradient-to-r from-purple-500 to-purple-400',
  red: 'bg-gradient-to-r from-red-400 to-red-500',
  white: 'bg-gradient-to-r from-slate-300 to-zinc-200',
  yellow: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
};
