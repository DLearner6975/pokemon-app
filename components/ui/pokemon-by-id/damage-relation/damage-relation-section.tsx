import type { DamageRelationSectionProps, TypeChipProps } from './types';

export const DamageRelationSection = ({
  title,
  types,
}: DamageRelationSectionProps) => {
  if (!types?.length) return null;

  return (
    <div>
      <p className="font-bold mb-2">{title}:</p>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <TypeChip key={type} type={type} />
        ))}
      </div>
    </div>
  );
};

const TypeChip = ({ type }: TypeChipProps) => {
  return (
    <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
      {type}
    </span>
  );
};
