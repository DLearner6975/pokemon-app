import {
  PokemonCardProps,
  shadowColorMap,
  typeColors,
} from '@/components/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Fragment } from 'react';

export const PokemonFrontCard = ({ details }: PokemonCardProps) => {
  const { name, color, types, abilities, sprites } = details;
  const shadowClass = shadowColorMap[color?.name ?? 'shadow-gray-500'];
  const displayImageUrl =
    // @ts-expect-error The other property is not recognized by TypeScript
    sprites?.other?.home?.front_default ||
    // @ts-expect-error The other property is not recognized by TypeScript
    sprites?.other?.dream_world?.front_default ||
    sprites?.front_default;
  return (
    <div className="backface-hidden">
      <div
        className={`relative flex justify-center items-center ${shadowClass} rounded-lg overflow-hidden h-[180px] group`}
      >
        <Image
          src={displayImageUrl || '/placeholder-image.jpg'}
          alt={`${name} sprite`}
          width={150}
          height={150}
          className={`w-[150px] h-[150px] object-contain p-4 transition-all duration-300 ease-in-out transform group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-3 z-10 shadow-lg rounded-lg ${shadowClass} md:backface-hidden`}
          aria-label={`${name} image. Hover to enlarge.`}
          priority
        />
      </div>
      <div className="flex items-center flex-wrap gap-0.5">
        <h3 className="font-semibold text-xs mr-1">Types:</h3>
        {types.map((type, index) => (
          <Badge
            key={index}
            className={`capitalize text-white text-xs ${
              typeColors[type?.type?.name] || 'bg-gray-500'
            }`}
          >
            {type?.type?.name}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-start text-xs">
        <h3 className="font-semibold  mr-1">Abilities:</h3>
        <div className="flex flex-wrap">
          {abilities.map((ability, index) => (
            <Fragment key={index}>
              {index > 0 && <span className="mx-1">/</span>}
              <span className="capitalize">{ability?.ability?.name}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
