export interface StatBarProps {
  value: number;
  maxValue?: number;
  backgroundColorClass?: string;
}

export interface PokemonStatsProps {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  backgroundColorClass?: string;
}
