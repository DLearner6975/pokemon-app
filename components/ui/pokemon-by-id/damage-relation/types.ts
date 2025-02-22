export interface DamageRelationSectionProps {
  title: string;
  types: string[];
  className?: string;
}

interface DamageRelations {
  double_damage_from: string[];
  double_damage_to: string[];
  half_damage_from: string[];
  half_damage_to: string[];
  no_damage_from: string[];
  no_damage_to: string[];
}

export interface DamageRelationsProps {
  damageRelations: DamageRelations;
  backgroundColorClass?: string;
}

export interface TypeChipProps {
  type: string;
  className?: string;
}
