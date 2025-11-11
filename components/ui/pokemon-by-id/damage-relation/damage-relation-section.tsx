import type { DamageRelationSectionProps, TypeChipProps } from './types';

export const DamageRelationSection = ({
  title,
  types,
  className = '',
}: DamageRelationSectionProps) => {
  if (!types?.length) return null;

  return (
    <div
    // className={`text-white ${className}`}
    >
      {/* <h4 className="font-semibold mb-1">{title}:</h4> */}
      <p className="font-bold mb-2">{title}:</p>
      <div className="flex flex-wrap gap-2">
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
      // className={`inline-block px-2 py-1 rounded text-white text-xs mr-1 mb-1 ${className}`}
      className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
    >
      {type}
    </span>
  );
};
