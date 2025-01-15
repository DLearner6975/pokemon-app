interface DamageRelationsProps {
  damageRelations: {
    double_damage_from: string[];
    double_damage_to: string[];
    half_damage_from: string[];
    half_damage_to: string[];
    no_damage_from: string[];
    no_damage_to: string[];
  };
  backgroundColorClass?: string;
}

export function PokemonDamageRelations({
  damageRelations,
  backgroundColorClass,
}: DamageRelationsProps) {
  if (!damageRelations) {
    console.error('Damage relations data is missing');
    return null;
  }

  const renderTypeChips = (types: string[]) => {
    return types.map((type) => (
      <span
        key={type}
        className="inline-block px-2 py-1 rounded text-white text-xs mr-1 mb-1"
        // style={{ backgroundColor: getTypeColor(type) }}
      >
        {type}
      </span>
    ));
  };

  return (
    <div
      className={`${
        backgroundColorClass ?? 'bg-gray-500'
      } p-4 rounded-lg shadow-sm`}
    >
      <h3 className="font-bold text-lg mb-2">Damage Relations</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-1">Weak against (2x damage):</h4>
          <div>{renderTypeChips(damageRelations.double_damage_from || [])}</div>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Strong against (2x damage):</h4>
          <div>{renderTypeChips(damageRelations.double_damage_to || [])}</div>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Resistant to (0.5x damage):</h4>
          <div>{renderTypeChips(damageRelations.half_damage_from || [])}</div>
        </div>
        <div>
          <h4 className="font-semibold mb-1">
            Not very effective against (0.5x damage):
          </h4>
          <div>{renderTypeChips(damageRelations.half_damage_to || [])}</div>
        </div>
        {(damageRelations.no_damage_from || []).length > 0 && (
          <div>
            <h4 className="font-semibold mb-1">Immune to:</h4>
            <div>{renderTypeChips(damageRelations.no_damage_from || [])}</div>
          </div>
        )}
        {(damageRelations.no_damage_to || []).length > 0 && (
          <div>
            <h4 className="font-semibold mb-1">Ineffective against:</h4>
            <div>{renderTypeChips(damageRelations.no_damage_to || [])}</div>
          </div>
        )}
      </div>
    </div>
  );
}
