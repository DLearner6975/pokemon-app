export type PokemonFilterKey =
  | 'types'
  | 'generation'
  | 'habitat'
  | 'shape'
  | 'color';

export interface PokemonFilterState {
  types: string[];
  generation: string[];
  habitat: string[];
  shape: string[];
  color: string[];
  legendary: boolean;
  mythical: boolean;
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonListEntity {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  artworkUrl: string;
  backImageUrl: string;
  types: string[];
  abilities: string[];
  stats: PokemonStat[];
  height: number;
  weight: number;
  baseExperience: number;
  generation: string | null;
  habitat: string | null;
  shape: string | null;
  color: string | null;
  isLegendary: boolean;
  isMythical: boolean;
}

export interface PokemonListSummaryItem {
  id: number;
  name: string;
  slug: string;
}

export interface PokemonIndexes {
  type: Record<string, number[]>;
  generation: Record<string, number[]>;
  habitat: Record<string, number[]>;
  shape: Record<string, number[]>;
  color: Record<string, number[]>;
  legendary: number[];
  mythical: number[];
}

export interface PokemonCatalog {
  entitiesById: Record<number, PokemonListEntity>;
  ids: number[];
  idsByName: Record<string, number>;
  indexes: PokemonIndexes;
}

export interface PokemonUiState {
  page: number;
  pageSize: number;
}

export interface PokemonStoreState {
  catalog: PokemonCatalog;
  filters: PokemonFilterState;
  searchQuery: string;
  pagination: PokemonUiState;
  status: 'idle' | 'ready' | 'error';
}

export interface PokemonFilterOption {
  value: string;
  label: string;
  count: number;
}

export interface PokemonFilterOptions {
  types: PokemonFilterOption[];
  generation: PokemonFilterOption[];
  habitat: PokemonFilterOption[];
  shape: PokemonFilterOption[];
  color: PokemonFilterOption[];
}

export interface RawPokemonListItem {
  name: string;
  url: string;
}

export interface RawPokemonType {
  type: { name: string };
}

export interface RawPokemonAbility {
  ability: { name: string };
}

export interface RawPokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface RawPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  abilities: RawPokemonAbility[];
  stats: RawPokemonStat[];
  types: RawPokemonType[];
  sprites: {
    front_default: string | null;
    back_default: string | null;
    other?: {
      dream_world?: { front_default: string | null };
      home?: { front_default: string | null };
      ['official-artwork']?: { front_default: string | null };
    };
  };
}

export interface RawPokemonSpecies {
  color: { name: string } | null;
  habitat: { name: string } | null;
  shape: { name: string } | null;
  generation: { name: string } | null;
  is_legendary: boolean;
  is_mythical: boolean;
}
