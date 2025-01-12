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
  // stats: {
  //   hp: { min: number; max: number };
  //   attack: { min: number; max: number };
  //   defense: { min: number; max: number };
  //   speed: { min: number; max: number };
  // };
  habitat: string[];
  shape: string[];
  color: string[];
  baseExperience: { min: number; max: number };
  legendary: boolean;
  mythical: boolean;
}

export interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
  initialFilters: Filters;
}
