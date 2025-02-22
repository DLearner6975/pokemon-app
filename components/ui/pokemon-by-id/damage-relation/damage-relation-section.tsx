import type { DamageRelationSectionProps, TypeChipProps } from './types';

export const DamageRelationSection = ({
  title,
  types,
  className = '',
}: DamageRelationSectionProps) => {
  if (!types?.length) return null;

  return (
    <div className={`text-white ${className}`}>
      <h4 className="font-semibold mb-1">{title}:</h4>
      <div>
        {types.map((type) => (
          <TypeChip key={type} type={type} />
        ))}
      </div>
    </div>
  );
};

const TypeChip = ({ type, className = '' }: TypeChipProps) => {
  return (
    <span
      className={`inline-block px-2 py-1 rounded text-white text-xs mr-1 mb-1 ${className}`}
    >
      {type}
    </span>
  );
};
