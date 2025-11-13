import { DamageRelationSection } from './damage-relation-section';
import type { PokemonData } from '@/components/utils/pokemon-data-formatter';

export const PokemonDamageRelations = ({
  formattedPokemon,
  gradientColor,
}: {
  formattedPokemon: PokemonData;
  gradientColor: string;
}) => {
  const damageRelations = formattedPokemon?.damageRelations;
  if (!damageRelations) {
    console.error('Damage relations data is missing');
    return null;
  }

  const sections = [
    {
      title: 'Weak against (2x damage)',
      types: damageRelations.double_damage_from,
    },
    {
      title: 'Strong against (2x damage)',
      types: damageRelations.double_damage_to,
    },
    {
      title: 'Resistant to (0.5x damage)',
      types: damageRelations.half_damage_from,
    },
    {
      title: 'Not very effective against (0.5x damage)',
      types: damageRelations.half_damage_to,
    },
    {
      title: 'Immune to',
      types: damageRelations.no_damage_from,
    },
    {
      title: 'Ineffective against',
      types: damageRelations.no_damage_to,
    },
  ];
  return (
    <div
      className={`${gradientColor} text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl`}
    >
      <h3 className="text-lg mb-2 font-super-adorable">Damage Relations</h3>
      <div className="grid grid-cols-2 gap-4">
        {sections.map(({ title, types }) => (
          <DamageRelationSection
            key={title}
            title={title}
            types={types || []}
          />
        ))}
      </div>
    </div>
  );
};
