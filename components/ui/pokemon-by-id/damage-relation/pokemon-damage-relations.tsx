import { backgroundColorClass } from '@/components/utils/color-util';
import { DamageRelationSection } from './damage-relation-section';
import type { PokemonData } from '@/components/utils/pokemon-data-formatter';

export const PokemonDamageRelations = ({
  formattedPokemon,
}: {
  formattedPokemon: PokemonData;
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
  const backgroundColor = backgroundColorClass(formattedPokemon.color);
  return (
    <div
      className={`${
        backgroundColor ?? 'bg-gray-500'
      } p-4 rounded-lg shadow-sm text-white`}
    >
      <h3 className="font-bold text-lg mb-2">Damage Relations</h3>
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
