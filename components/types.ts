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
