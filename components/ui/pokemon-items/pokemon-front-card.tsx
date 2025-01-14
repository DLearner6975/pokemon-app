import { shadowColorMap, typeColors } from '@/components/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Fragment } from 'react';

export const PokemonFrontCard = ({
  color,
  imageUrl,
  name,
  types,
  abilities,
}) => {
  const shadowClass = shadowColorMap[color?.name] || 'shadow-gray-500';
  return (
    <div className="backface-hidden">
      <div
        className={`relative flex justify-center items-center ${shadowClass} rounded-lg overflow-hidden h-[180px] group`}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
        <Image
          src={imageUrl || '/placeholder-image.jpg'}
          alt={`${name} sprite`}
          width={150}
          height={150}
          className={`w-[150px] h-[150px] object-contain p-4 transition-all duration-300 ease-in-out transform group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-3 z-10 shadow-lg rounded-lg ${shadowClass}`}
          aria-label={`${name} image. Hover to enlarge.`}
          priority
        />
      </div>
      <div className="flex items-center flex-wrap gap-0.5">
        <h3 className="font-semibold text-xs mr-1">Types:</h3>
        {types.map((type) => (
          <Badge
            key={type}
            className={`capitalize text-white text-xs ${
              typeColors[type] || 'bg-gray-500'
            }`}
          >
            {type}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-start text-xs">
        <h3 className="font-semibold  mr-1">Abilities:</h3>
        <div className="flex flex-wrap">
          {abilities.map((ability, index) => (
            <Fragment key={ability}>
              {index > 0 && <span className="mx-1">/</span>}
              <span className="capitalize">{ability}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
